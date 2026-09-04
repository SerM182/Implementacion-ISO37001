import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { sgasStorage } from './storage.js';

/**
 * Motor de sincronización bidireccional entre la app y Supabase
 */
export const supabaseSync = {
  // Comprobar si Supabase está activo
  isConnected: () => isSupabaseConfigured(),

  // Cargar todos los datos desde Supabase a la app
  pullFromCloud: async () => {
    if (!isSupabaseConfigured() || !supabase) return { success: false, message: 'Supabase no configurado' };

    try {
      // 1. Riesgos
      const { data: risksData, error: errRisks } = await supabase.from('risks').select('*');
      if (!errRisks && risksData) sgasStorage.saveRisks(risksData);

      // 2. Socios
      const { data: partnersData, error: errPartners } = await supabase.from('partners').select('*');
      if (!errPartners && partnersData) sgasStorage.savePartners(partnersData);

      // 3. Registros Cl. 7.5
      const { data: recordsData, error: errRecords } = await supabase.from('records').select('*');
      if (!errRecords && recordsData) sgasStorage.saveRecords(recordsData);

      // 4. Denuncias
      const { data: reportsData, error: errReports } = await supabase.from('whistleblowing_reports').select('*');
      if (!errReports && reportsData) sgasStorage.saveReports(reportsData);

      // 5. Colaboradores Capacitados
      const { data: collabsData, error: errCollabs } = await supabase.from('training_collaborators').select('*');
      if (!errCollabs && collabsData) sgasStorage.saveCollaborators(collabsData);

      // 6. Checklist 32 Requisitos
      const { data: gapData, error: errGap } = await supabase.from('gap_analysis').select('*');
      if (!errGap && gapData && gapData.length > 0) sgasStorage.saveGapAnalysis(gapData);

      return { success: true };
    } catch (e) {
      console.error('Error al sincronizar desde Supabase:', e);
      return { success: false, error: e.message };
    }
  },

  // Enviar todos los datos locales hacia Supabase
  pushToCloud: async () => {
    if (!isSupabaseConfigured() || !supabase) return { success: false, message: 'Supabase no configurado' };

    try {
      const risks = sgasStorage.getRisks();
      if (risks.length > 0) {
        await supabase.from('risks').upsert(risks);
      }

      const partners = sgasStorage.getPartners();
      if (partners.length > 0) {
        await supabase.from('partners').upsert(partners);
      }

      const records = sgasStorage.getRecords();
      if (records.length > 0) {
        await supabase.from('records').upsert(records);
      }

      const reports = sgasStorage.getReports();
      if (reports.length > 0) {
        await supabase.from('whistleblowing_reports').upsert(reports);
      }

      const collabs = sgasStorage.getCollaborators();
      if (collabs.length > 0) {
        await supabase.from('training_collaborators').upsert(collabs);
      }

      const gapItems = sgasStorage.getGapAnalysis();
      if (gapItems.length > 0) {
        await supabase.from('gap_analysis').upsert(gapItems);
      }

      return { success: true };
    } catch (e) {
      console.error('Error al subir a Supabase:', e);
      return { success: false, error: e.message };
    }
  }
};
