import { useState } from "react";
import { 
  Clock, 
  CheckCircle2, 
  MapPin,
  Calendar,
  Filter,
  Search,
  Droplets,
  Heart,
  Home as HomeIcon,
  Utensils,
  AlertCircle,
  Eye,
  Award,
  TrendingUp,
  Users
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useLanguage } from "../LanguageProvider";

type NeedType = "water" | "medical" | "shelter" | "food" | "other";
type VerificationAction = "verified" | "added_context" | "flagged";

interface ReviewedReport {
  id: string;
  caseId: string;
  needType: NeedType;
  description: string;
  location: string;
  reportedAt: string;
  reviewedAt: string;
  verificationAction: VerificationAction;
  myNotes?: string;
  dependents?: number;
  resolutionStatus: "resolved" | "in_progress" | "escalated";
}

export function ReportsReviewedPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [needFilter, setNeedFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReviewedReport | null>(null);

  // Mock data for reviewed reports
  const [reviewedReports] = useState<ReviewedReport[]>([
    {
      id: "1",
      caseId: "CASE-2024-045",
      needType: "water",
      description: "Water supply disrupted, community of 50+ families",
      location: "Koramangala, Bangalore",
      reportedAt: "2024-11-07T08:30:00Z",
      reviewedAt: "2024-11-07T09:15:00Z",
      verificationAction: "verified",
      myNotes: "Confirmed on-site. Water tanker dispatched.",
      dependents: 12,
      resolutionStatus: "resolved",
    },
    {
      id: "2",
      caseId: "CASE-2024-046",
      needType: "medical",
      description: "Need urgent medical supplies for elderly residents",
      location: "MG Road Area, Bangalore",
      reportedAt: "2024-11-07T10:00:00Z",
      reviewedAt: "2024-11-07T10:30:00Z",
      verificationAction: "verified",
      myNotes: "Verified. Ambulance and medical team dispatched.",
      dependents: 8,
      resolutionStatus: "in_progress",
    },
    {
      id: "3",
      caseId: "CASE-2024-041",
      needType: "shelter",
      description: "Families displaced due to flooding",
      location: "Whitefield, Bangalore",
      reportedAt: "2024-11-06T15:20:00Z",
      reviewedAt: "2024-11-06T16:45:00Z",
      verificationAction: "verified",
      myNotes: "15 families confirmed displaced. Shelter arranged at community center.",
      dependents: 15,
      resolutionStatus: "resolved",
    },
    {
      id: "4",
      caseId: "CASE-2024-038",
      needType: "food",
      description: "Food supplies needed for community center",
      location: "Indiranagar, Bangalore",
      reportedAt: "2024-11-05T12:00:00Z",
      reviewedAt: "2024-11-05T13:30:00Z",
      verificationAction: "verified",
      myNotes: "Verified need. Food packets delivered by local NGO.",
      dependents: 25,
      resolutionStatus: "resolved",
    },
    {
      id: "5",
      caseId: "CASE-2024-042",
      needType: "medical",
      description: "Elderly person needs medication",
      location: "Jayanagar, Bangalore",
      reportedAt: "2024-11-06T09:00:00Z",
      reviewedAt: "2024-11-06T09:45:00Z",
      verificationAction: "added_context",
      myNotes: "Added details about specific medication needed. Pharmacy contacted.",
      dependents: 1,
      resolutionStatus: "resolved",
    },
    {
      id: "6",
      caseId: "CASE-2024-039",
      needType: "water",
      description: "Urgent - well contaminated, need clean water",
      location: "Yelahanka, Bangalore",
      reportedAt: "2024-11-05T16:30:00Z",
      reviewedAt: "2024-11-05T17:00:00Z",
      verificationAction: "verified",
      myNotes: "Confirmed contamination. Water testing done. Tankers sent.",
      dependents: 30,
      resolutionStatus: "in_progress",
    },
    {
      id: "7",
      caseId: "CASE-2024-037",
      needType: "shelter",
      description: "Family evicted, need immediate shelter",
      location: "BTM Layout, Bangalore",
      reportedAt: "2024-11-04T11:00:00Z",
      reviewedAt: "2024-11-04T12:00:00Z",
      verificationAction: "verified",
      myNotes: "Verified case. Temporary shelter provided at govt facility.",
      dependents: 4,
      resolutionStatus: "resolved",
    },
  ]);

  const needTypes = [
    { value: "water", label: t.needWater, icon: Droplets, color: "blue" },
    { value: "medical", label: t.needMedical, icon: Heart, color: "red" },
    { value: "shelter", label: t.needShelter, icon: HomeIcon, color: "purple" },
    { value: "food", label: t.needFood, icon: Utensils, color: "green" },
    { value: "other", label: t.needOther, icon: AlertCircle, color: "gray" },
  ];

  const handleViewReport = (report: ReviewedReport) => {
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  // Filter reports
  const filteredReports = reviewedReports.filter((report) => {
    const matchesSearch = 
      report.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesNeed = needFilter === "all" || report.needType === needFilter;
    const matchesAction = actionFilter === "all" || report.verificationAction === actionFilter;
    
    return matchesSearch && matchesNeed && matchesAction;
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getResolutionBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge variant="default" className="bg-green-600">Resolved</Badge>;
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "escalated":
        return <Badge variant="destructive">Escalated</Badge>;
      default:
        return null;
    }
  };

  const getActionBadge = (action: VerificationAction) => {
    switch (action) {
      case "verified":
        return <Badge variant="default" className="bg-[#b4befe] text-[#11111b]">✓ Verified</Badge>;
      case "added_context":
        return <Badge variant="outline">Added Context</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    totalReviewed: reviewedReports.length,
    resolved: reviewedReports.filter(r => r.resolutionStatus === "resolved").length,
    inProgress: reviewedReports.filter(r => r.resolutionStatus === "in_progress").length,
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-6 w-6" />
            {t.reportsReviewed}
          </CardTitle>
          <CardDescription>
            Track all reports you have verified and reviewed as a volunteer
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#b4befe]/20 dark:bg-[#b4befe]/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-[#b4befe] dark:text-[#b4befe]" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviewed</p>
                <p className="text-2xl font-bold">{stats.totalReviewed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
                <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Resolved</p>
                <p className="text-2xl font-bold">{stats.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-950 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Need Type Filter */}
            <Select value={needFilter} onValueChange={setNeedFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by Need" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Needs</SelectItem>
                <SelectItem value="water">{t.needWater}</SelectItem>
                <SelectItem value="medical">{t.needMedical}</SelectItem>
                <SelectItem value="shelter">{t.needShelter}</SelectItem>
                <SelectItem value="food">{t.needFood}</SelectItem>
                <SelectItem value="other">{t.needOther}</SelectItem>
              </SelectContent>
            </Select>

            {/* Action Filter */}
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by Action" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="added_context">Added Context</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results count and Clear Filters */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t.showingResults} {filteredReports.length} {t.totalReports}
            </div>
            {(searchQuery || needFilter !== "all" || actionFilter !== "all") && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setNeedFilter("all");
                  setActionFilter("all");
                }}
              >
                {t.clearFilters}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports.map((report) => {
            const needType = needTypes.find(n => n.value === report.needType);
            const NeedIcon = needType?.icon || AlertCircle;

            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          needType?.color === 'blue' ? 'bg-[#b4befe]/20 dark:bg-[#b4befe]/10' :
                          needType?.color === 'red' ? 'bg-red-100 dark:bg-red-950' :
                          needType?.color === 'purple' ? 'bg-purple-100 dark:bg-purple-950' :
                          needType?.color === 'green' ? 'bg-green-100 dark:bg-green-950' :
                          'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <NeedIcon className={`h-5 w-5 ${
                            needType?.color === 'blue' ? 'text-[#b4befe]' :
                            needType?.color === 'red' ? 'text-red-600' :
                            needType?.color === 'purple' ? 'text-purple-600' :
                            needType?.color === 'green' ? 'text-green-600' :
                            'text-gray-600'
                          }`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {report.caseId}
                            </h3>
                            {getActionBadge(report.verificationAction)}
                            {getResolutionBadge(report.resolutionStatus)}
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {report.description}
                          </p>

                          {/* My Notes */}
                          {report.myNotes && (
                            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900 mb-3">
                              <p className="text-sm text-green-900 dark:text-green-100">
                                <strong>My Notes:</strong> {report.myNotes}
                              </p>
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {report.location}
                            </div>
                            {report.dependents && (
                              <div className="flex items-center gap-1">
                                👥 {report.dependents} Dependents
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Reported: {formatDate(report.reportedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Reviewed: {formatDate(report.reviewedAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {t.viewReport}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">{t.noReportsFound}</h3>
            <p className="text-gray-500">{t.adjustFilters}</p>
          </CardContent>
        </Card>
      )}

      {/* View Report Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.reportDetails}</DialogTitle>
            <DialogDescription>
              {selectedReport?.caseId}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportedBy}</Label>
                  <p className="font-medium">Anonymous User</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">{t.reportTime}</Label>
                  <p className="font-medium">{formatDate(selectedReport.reportedAt)}</p>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">Need Type</Label>
                <div className="mt-1">
                  <Badge>{needTypes.find(n => n.value === selectedReport.needType)?.label}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportDescription}</Label>
                <p className="mt-1">{selectedReport.description}</p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">{t.reportLocation}</Label>
                <p className="mt-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedReport.location}
                </p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">Number of Dependents</Label>
                <p className="mt-1 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedReport.dependents} People affected
                </p>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">Verification Action</Label>
                <div className="mt-1">
                  {getActionBadge(selectedReport.verificationAction)}
                </div>
              </div>

              <div>
                <Label className="text-gray-600 dark:text-gray-400">Resolution Status</Label>
                <div className="mt-1">
                  {getResolutionBadge(selectedReport.resolutionStatus)}
                </div>
              </div>

              {selectedReport.myNotes && (
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Your Verification Notes</Label>
                  <div className="mt-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      {selectedReport.myNotes}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Reported At</Label>
                  <p className="mt-1 text-sm">{formatDate(selectedReport.reportedAt)}</p>
                </div>
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Reviewed At</Label>
                  <p className="mt-1 text-sm">{formatDate(selectedReport.reviewedAt)}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
