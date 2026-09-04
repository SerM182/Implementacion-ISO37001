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

import ExportImportModal from './components/common/ExportImportModal.jsx';
import MasterPrintReport from './components/print/MasterPrintReport.jsx';
import AuthModal from './components/auth/AuthModal.jsx';

import { sgasStorage } from './utils/storage.js';
import { supabaseSync } from './utils/supabaseSync.js';
import { RED_FLAGS_CATALOG } from './data/initialRedFlagsData.js';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'advisor' | 'risks' | 'dueDiligence' | 'records' | 'policies' | 'gapAnalysis' | 'redFlags'

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
  const [redFlags] = useState(RED_FLAGS_CATALOG);

  // Modales globales
  const [isExportImportOpen, setIsExportImportOpen] = useState(false);
  const [isPrintReportOpen, setIsPrintReportOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sincronización automática con Supabase Cloud en el arranque de la app
  useEffect(() => {
    if (supabaseSync.isConnected()) {
      supabaseSync.pullFromCloud().then((res) => {
        if (res.success && res.data) {
          if (res.data.risks) setRisks(res.data.risks);
          if (res.data.partners) setPartners(res.data.partners);
          if (res.data.records) setRecords(res.data.records);
          if (res.data.reports) setReports(res.data.reports);
          if (res.data.collaborators) setCollaborators(res.data.collaborators);
          if (res.data.gapItems && res.data.gapItems.length > 0) setGapItems(res.data.gapItems);
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
      {/* Contenedor Superior con Sombra de Hoja/Página Moderna */}
      <div className="w-full max-w-[1400px] mx-auto my-0 sm:my-3 bg-white shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border border-slate-200/80 flex flex-col min-h-[96vh]">
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
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 bg-[#f8fafc]">
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
              risks={risks}
              onUpdateRisks={handleUpdateRisks}
            />
          )}

          {activeTab === 'dueDiligence' && (
            <DueDiligenceView
              partners={partners}
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
