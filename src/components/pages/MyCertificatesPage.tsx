import { HealthCertificate } from "../HealthCertificate";
import { useLanguage } from "../LanguageProvider";

export function MyCertificatesPage() {
  const { t } = useLanguage();
  
  // Mock data for health certificates with translated titles
  const healthCertificates = [
    {
      id: "1",
      title: t.covid19Certificate,
      healthId: "VX-2024-001-789456",
      issueDate: "2024-01-15",
      status: "valid" as const,
    },
    {
      id: "2", 
      title: t.annualCheckup,
      healthId: "HC-2024-002-123789",
      issueDate: "2024-02-20",
      status: "valid" as const,
    },
    {
      id: "3",
      title: t.bloodTestResults,
      healthId: "BT-2023-003-456123",
      issueDate: "2023-12-10",
      status: "expired" as const,
    },
    {
      id: "4",
      title: t.dentalHealthCertificate,
      healthId: "DH-2024-004-789123",
      issueDate: "2024-03-05",
      status: "valid" as const,
    },
    {
      id: "5",
      title: t.eyeExaminationReport,
      healthId: "EX-2024-005-321654",
      issueDate: "2024-01-30",
      status: "pending" as const,
    },
    {
      id: "6",
      title: t.mentalHealthAssessment,
      healthId: "MH-2024-006-987321",
      issueDate: "2024-02-15",
      status: "valid" as const,
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">{t.yourHealthDocuments}</h2>
        <p className="text-muted-foreground">{t.manageCertificatesAndIds}</p>
      </div>
      
      {/* Health Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {healthCertificates.map((certificate) => (
          <HealthCertificate
            key={certificate.id}
            {...certificate}
          />
        ))}
      </div>
      
      {/* Empty State */}
      {healthCertificates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t.noCertificatesFound}</p>
        </div>
      )}
    </div>
  );
}
