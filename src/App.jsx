import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import SubHeader from './components/layout/SubHeader.jsx';
import Footer from './components/layout/Footer.jsx';
import LoginScreen from './components/auth/LoginScreen.jsx';

import ExecutiveDashboard from './components/dashboard/ExecutiveDashboard.jsx';
import ComplianceAdvisorView from './components/advisor/ComplianceAdvisorView.jsx';
import RiskMatrixView from './components/riskMatrix/RiskMatrixView.jsx';
import DueDiligenceView from './components/dueDiligence/DueDiligenceView.jsx';
import RecordsManagementView from './components/records/RecordsManagementView.jsx';
import TrainingSuiteView from './components/training/TrainingSuiteView.jsx';
import PolicySuiteView from './components/policyBuilder/PolicySuiteView.jsx';
import GapAnalysisView from './components/gapAnalysis/GapAnalysisView.jsx';
import RedFlagsRadarView from './components/redFlags/RedFlagsRadarView.jsx';
import UsersManagementView from './components/users/UsersManagementView.jsx';

import ExportImportModal from './components/common/ExportImportModal.jsx';
import MasterPrintReport from './components/print/MasterPrintReport.jsx';
import AuthModal from './components/auth/AuthModal.jsx';

import { sgasStorage } from './utils/storage.js';
import { supabaseSync } from './utils/supabaseSync.js';
import { RED_FLAGS_CATALOG } from './data/initialRedFlagsData.js';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'advisor' | 'risks' | 'dueDiligence' | 'records' | 'policies' | 'gapAnalysis' | 'redFlags' | 'users'

  // Estados reactivos cargados desde storage
  const [risks, setRisks] = useState(() => sgasStorage.getRisks());
  const [partners, setPartners] = useState(() => sgasStorage.getPartners());
  const [policies, setPolicies] = useState(() => sgasStorage.getPolicies());
  const [gapItems, setGapItems] = useState(() => sgasStorage.getGapAnalysis());
  const [reports, setReports] = useState(() => sgasStorage.getReports());
  const [roadmapPhases, setRoadmapPhases] = useState(() => sgasStorage.getRoadmap());
  const [records, setRecords] = useState(() => sgasStorage.getRecords());
  const [trainingPlan, setTrainingPlan] = useState(() => sgasStorage.getTrainingPlan());
  const [collaborators, setCollaborators] = useState(() => sgasStorage.getCollaborators());
  const [users, setUsers] = useState(() => sgasStorage.getUsers());
  const [redFlags] = useState(RED_FLAGS_CATALOG);

  // Modales globales
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);
  const [isPrintReportOpen, setIsPrintReportOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sincronización automática con Supabase Cloud en el arranque de la app.
  // Solo hidrata cada lista si sigue vacía al momento de recibir la respuesta:
  // si el usuario ya cargó/agregó datos localmente mientras el pull estaba en
  // vuelo, esos datos locales prevalecen en vez de ser pisados por la nube.
  useEffect(() => {
    if (supabaseSync.isConnected()) {
      // Hidrata React state y localStorage a la vez solo cuando corresponde
      // aplicar los datos de la nube; si no corresponde, deja todo intacto.
      const hydrateIfEmpty = (cloudList, setter, saveFn) => {
        if (!(cloudList?.length > 0)) return;
        setter(prev => {
          if (prev.length !== 0) return prev;
          saveFn(cloudList);
          return cloudList;
        });
      };

      supabaseSync.pullFromCloud().then((res) => {
        if (res.success && res.data) {
          hydrateIfEmpty(res.data.risks, setRisks, sgasStorage.saveRisks);
          hydrateIfEmpty(res.data.partners, setPartners, sgasStorage.savePartners);
          hydrateIfEmpty(res.data.records, setRecords, sgasStorage.saveRecords);
          hydrateIfEmpty(res.data.reports, setReports, sgasStorage.saveReports);
          hydrateIfEmpty(res.data.collaborators, setCollaborators, sgasStorage.saveCollaborators);
          hydrateIfEmpty(res.data.users, setUsers, sgasStorage.saveUsers);

          if (res.data.gapItems?.length > 0) {
            setGapItems(prev => {
              const isPrevUntouched = prev.every(i => !i.estadoConformidad || i.estadoConformidad === 'no_conforme');
              if (!isPrevUntouched) return prev;
              sgasStorage.saveGapAnalysis(res.data.gapItems);
              return res.data.gapItems;
            });
          }
        }
      }).catch(err => {
        console.warn('Auto-pull inicial de Supabase:', err);
      });
    }
  }, []);

  // Sincronización local + Supabase Cloud
  const handleUpdateRisks = (newRisks) => {
    setRisks(newRisks);
    sgasStorage.saveRisks(newRisks);
    if (supabaseSync.isConnected()) {
      supabaseSync.pushToCloud();
    }
  };

  const handleUpdatePartners = (newPartners) => {
    setPartners(newPartners);
    sgasStorage.savePartners(newPartners);
    if (supabaseSync.isConnected()) {
      supabaseSync.pushToCloud();
    }
  };

  const handleUpdatePolicies = (newPolicies) => {
    setPolicies(newPolicies);
    sgasStorage.savePolicies(newPolicies);
  };

  const handleUpdateGapItems = (newItems) => {
    setGapItems(newItems);
    sgasStorage.saveGapAnalysis(newItems);
    if (supabaseSync.isConnected()) {
      supabaseSync.saveGapItems(newItems);
    }
  };

  const handleUpdateReports = (newReports) => {
    setReports(newReports);
    sgasStorage.saveReports(newReports);
    if (supabaseSync.isConnected()) {
      supabaseSync.pushToCloud();
    }
  };

  const handleCreateReport = (newReport) => {
    const nextList = [newReport, ...reports];
    setReports(nextList);
    sgasStorage.saveReports(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.saveReportItem(newReport);
    }
  };

  const handleUpdateRoadmapPhases = (newPhases) => {
    setRoadmapPhases(newPhases);
    sgasStorage.saveRoadmap(newPhases);
  };

  const handleUpdateCollaborators = (newCollabs) => {
    setCollaborators(newCollabs);
    sgasStorage.saveCollaborators(newCollabs);
    if (supabaseSync.isConnected()) {
      supabaseSync.pushToCloud();
    }
  };

  const handleUpdateTrainingPlan = (newPlan) => {
    setTrainingPlan(newPlan);
    sgasStorage.saveTrainingPlan(newPlan);
  };

  // Handlers para Usuarios del Sistema
  const handleAddUser = (newUser) => {
    const nextList = [newUser, ...users];
    setUsers(nextList);
    sgasStorage.saveUsers(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.saveUserItem(newUser);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    const nextList = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(nextList);
    sgasStorage.saveUsers(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.saveUserItem(updatedUser);
    }
  };

  const handleDeleteUser = (userId) => {
    const nextList = users.filter(u => u.id !== userId);
    setUsers(nextList);
    sgasStorage.saveUsers(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.deleteUserItem(userId);
    }
  };

  // Handlers para Registros y Evidencias (Cl. 7.5) con guardado reactivo a Supabase
  const handleAddRecord = (newRecord) => {
    const nextList = [newRecord, ...records];
    setRecords(nextList);
    sgasStorage.saveRecords(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.saveRecordItem(newRecord);
    }
  };

  const handleUpdateRecord = (updatedRecord) => {
    const nextList = records.map(r => r.id === updatedRecord.id ? updatedRecord : r);
    setRecords(nextList);
    sgasStorage.saveRecords(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.saveRecordItem(updatedRecord);
    }
  };

  const handleDeleteRecord = (recordId) => {
    const nextList = records.filter(r => r.id !== recordId);
    setRecords(nextList);
    sgasStorage.saveRecords(nextList);
    if (supabaseSync.isConnected()) {
      supabaseSync.deleteRecordItem(recordId);
    }
  };

  const handleDataRestored = () => {
    setRisks(sgasStorage.getRisks());
    setPartners(sgasStorage.getPartners());
    setPolicies(sgasStorage.getPolicies());
    setGapItems(sgasStorage.getGapAnalysis());
    setReports(sgasStorage.getReports());
    setRoadmapPhases(sgasStorage.getRoadmap());
    setRecords(sgasStorage.getRecords());
    setTrainingPlan(sgasStorage.getTrainingPlan());
    setCollaborators(sgasStorage.getCollaborators());
    setUsers(sgasStorage.getUsers());
  };

  // 1. Pantalla de Carga Inicial
  if (loading) {
    return (
      <div className="min-h-screen bg-[#e9eef3] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0284c7] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-700 tracking-wide">Iniciando Sistema AUBASA SGAS...</p>
        </div>
      </div>
    );
  }

  // 2. Pantalla de Acceso / Login Institucional Obligatorio
  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-[#e9eef3] text-slate-800 flex flex-col selection:bg-sky-500 selection:text-white font-sans antialiased">
      {/* Contenedor Superior con Sombra de Hoja/Página Moderna y Ancho Completo Flexible */}
      <div className="w-full max-w-full 2xl:max-w-[1680px] mx-auto my-0 sm:my-2 bg-white shadow-xl rounded-none sm:rounded-xl border border-slate-200/80 flex flex-col min-h-[98vh] overflow-x-hidden">
        {/* Navbar Superior Blanco Mejorado */}
        <Navbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenExportModal={() => setIsExportImportOpen(true)}
          onPrintMaster={() => setIsPrintReportOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* SubHeader Azul Intermedio */}
        <SubHeader
          activeTab={activeTab}
          risksCount={risks.length}
          partnersCount={partners.length}
          gapItemsCount={gapItems.length}
          reportsCount={reports.length}
          recordsCount={records.length}
          collabsCount={collaborators.length}
          onOpenAdvisor={() => setActiveTab('advisor')}
        />

        {/* Contenedor Principal de la Vista Activa */}
        <main className="flex-1 w-full p-3 sm:p-5 lg:p-6 bg-[#f8fafc]">
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              roadmapPhases={roadmapPhases}
              onUpdatePhases={handleUpdateRoadmapPhases}
              risks={risks}
              partners={partners}
              gapItems={gapItems}
              reports={reports}
              records={records}
              redFlags={redFlags}
              onNavigate={setActiveTab}
              onOpenPrintReport={() => setIsPrintReportOpen(true)}
            />
          )}

          {activeTab === 'advisor' && (
            <ComplianceAdvisorView />
          )}

          {activeTab === 'risks' && (
            <RiskMatrixView
              risksList={risks}
              onUpdateRisks={handleUpdateRisks}
            />
          )}

          {activeTab === 'dueDiligence' && (
            <DueDiligenceView
              partnersList={partners}
              onUpdatePartners={handleUpdatePartners}
            />
          )}

          {activeTab === 'records' && (
            <RecordsManagementView
              records={records}
              onAddRecord={handleAddRecord}
              onUpdateRecord={handleUpdateRecord}
              onDeleteRecord={handleDeleteRecord}
            />
          )}

          {activeTab === 'training' && (
            <TrainingSuiteView
              trainingPlan={trainingPlan}
              collaborators={collaborators}
              onUpdateCollaborators={handleUpdateCollaborators}
              onUpdateTrainingPlan={handleUpdateTrainingPlan}
              onAddRecord={handleAddRecord}
            />
          )}

          {activeTab === 'policies' && (
            <PolicySuiteView
              policies={policies}
              policiesList={policies}
              onUpdatePolicies={handleUpdatePolicies}
              onNavigateToRecords={(cat) => setActiveTab('records')}
            />
          )}

          {activeTab === 'gapAnalysis' && (
            <GapAnalysisView
              gapItems={gapItems}
              onUpdateGapItems={handleUpdateGapItems}
              roadmapPhases={roadmapPhases}
              onUpdatePhases={handleUpdateRoadmapPhases}
              onNavigateToPolicy={(poeCode) => setActiveTab('policies')}
              onNavigateToRecords={(clause) => setActiveTab('records')}
            />
          )}

          {activeTab === 'redFlags' && (
            <RedFlagsRadarView
              redFlags={redFlags}
              whistleblowingReports={reports}
              onUpdateReports={handleUpdateReports}
              onCreateReport={handleCreateReport}
            />
          )}

          {activeTab === 'users' && (
            <UsersManagementView
              users={users}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onOpenExportModal={() => setIsExportImportOpen(true)} />
      </div>

      {/* Modales Globales */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ExportImportModal
        isOpen={isExportImportOpen}
        onClose={() => setIsExportImportOpen(false)}
        risksList={risks}
        partnersList={partners}
        onDataReloaded={handleDataRestored}
      />

      <MasterPrintReport
        isOpen={isPrintReportOpen}
        onClose={() => setIsPrintReportOpen(false)}
        risks={risks}
        partners={partners}
        policies={policies}
        gapItems={gapItems}
        reports={reports}
        records={records}
        trainingPlan={trainingPlan}
        collaborators={collaborators}
        roadmapPhases={roadmapPhases}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
