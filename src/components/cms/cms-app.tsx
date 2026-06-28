"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/app-store";
import { CmsShell, type CmsPage } from "./cms-shell";
import { CmsLogin } from "./login";
import { CmsDashboard } from "./screens/dashboard";
import { CmsPatients } from "./screens/patients";
import { CmsAppointments } from "./screens/appointments";
import { CmsQueue } from "./screens/queue";
import { CmsDoctors } from "./screens/doctors";
import { CmsFinance } from "./screens/finance";
import { CmsWebsiteEditor } from "./screens/website-editor";
import { CmsSettings } from "./screens/settings";

export function CmsApp() {
  const { cmsAuthenticated } = useAppStore();
  const [page, setPage] = useState<CmsPage>("dashboard");

  if (!cmsAuthenticated) {
    return <CmsLogin />;
  }

  return (
    <CmsShell page={page} onPageChange={setPage}>
      {page === "dashboard" && <CmsDashboard />}
      {page === "patients" && <CmsPatients />}
      {page === "appointments" && <CmsAppointments />}
      {page === "queue" && <CmsQueue />}
      {page === "doctors" && <CmsDoctors />}
      {page === "finance" && <CmsFinance />}
      {page === "website" && <CmsWebsiteEditor />}
      {page === "settings" && <CmsSettings />}
    </CmsShell>
  );
}
