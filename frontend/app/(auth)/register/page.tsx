"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import Image from "next/image";
import { Button } from "@/components/controls/button";
import {
  CheckIcon,
  UserIcon,
  UserCheckIcon,
  ClipboardListIcon,
  CheckCircle2Icon,
  AwardIcon,
  UsersIcon,
  InfoIcon,
  TrendingUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";

// Import new panel components
import PanelAccountInfo from "@/components/panels/panel-account-info";
import PanelRoleSetup from "@/components/panels/panel-role-setup";
import PanelCoachInfo from "@/components/panels/panel-coach-info";
import PanelTeamManagerInfo from "@/components/panels/panel-team-manager-info";
import PanelRefereeInfo from "@/components/panels/panel-referee-info";
import PanelTeamSetup from "@/components/panels/panel-team-setup";
import PanelMembership from "@/components/panels/panel-membership";
import PanelReview from "@/components/panels/panel-review";
import { TypeSport, TypeOrgTeam } from "@/types/types";
import { components } from "@/types/api-types";

// Import AuthService
import { AuthService } from "@/lib/services/auth.service";

// Define types for registration steps and data
type RegistrationStep =
  | "account-info"
  | "role-setup"
  | "coach-info"
  | "team-manager-info"
  | "referee-info"
  | "team-setup"
  | "membership"
  | "review";

type UserRole = "coach" | "team-manager" | "referee" | "later" | null;
type MembershipTier = "starter" | "pro" | "enterprise" | null;

// Extend window interface to include triggerAccountInfoSubmit
declare global {
  interface Window {
    triggerAccountInfoSubmit?: () => void;
  }
}

// Extend window interface to include triggerAccountInfoSubmit
declare global {
  interface Window {
    triggerAccountInfoSubmit?: () => void;
  }
}

// Extend window interface to include triggerAccountInfoSubmit
declare global {
  interface Window {
    triggerAccountInfoSubmit?: () => void;
  }
}

export default function RegisterPage() {
  const router = useRouter();

  // State management for registration process
  const [currentStep, setCurrentStep] =
    useState<RegistrationStep>("account-info");
  const [completedSteps, setCompletedSteps] = useState<RegistrationStep[]>([]);

  // Registration data states
  const [accountInfo, setAccountInfo] = useState<{
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    confirm_password?: string;
  }>({});
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [coachInfo, setCoachInfo] = useState<{
    sport?: components["schemas"]["BaseSportDto"];
    club?: components["schemas"]["OrgClubDto"];
    team?: components["schemas"]["OrgTeamDto"];
    [key: string]: any;
  }>({});
  const [teamManagerInfo, setTeamManagerInfo] = useState({});
  const [refereeInfo, setRefereeInfo] = useState({});
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipTier>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  console.log(players);

  // Step navigation handlers
  const nextStep = () => {
    const stepOrder: RegistrationStep[] = [
      "account-info",
      "role-setup",
      "coach-info",
      "team-manager-info",
      "referee-info",
      "team-setup",
      "membership",
      "review",
    ];

    const currentStepIndex = stepOrder.indexOf(currentStep);
    const nextStepIndex = currentStepIndex + 1;

    if (nextStepIndex < stepOrder.length) {
      let nextStep: RegistrationStep;

      switch (currentStep) {
        case "account-info":
          nextStep = "role-setup";
          break;
        case "role-setup":
          if (selectedRole === "coach") {
            nextStep = "coach-info";
          } else if (selectedRole === "team-manager") {
            nextStep = "team-manager-info";
          } else if (selectedRole === "referee") {
            nextStep = "referee-info";
          } else if (selectedRole === "later") {
            nextStep = "membership";
          } else {
            return; // No role selected
          }
          break;
        case "coach-info":
          nextStep = "team-setup";
          break;
        case "team-manager-info":
          nextStep = "team-setup";
          break;
        case "referee-info":
          nextStep = "membership";
          break;
        case "team-setup":
          nextStep = "membership";
          break;
        case "membership":
          nextStep = "review";
          break;
        default:
          return;
      }

      setCurrentStep(nextStep);
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
  };

  const prevStep = () => {
    const stepOrder: RegistrationStep[] = [
      "account-info",
      "role-setup",
      "coach-info",
      "team-manager-info",
      "referee-info",
      "team-setup",
      "membership",
      "review",
    ];

    const currentStepIndex = stepOrder.indexOf(currentStep);

    if (currentStepIndex > 0) {
      let prevStep: RegistrationStep = "account-info"; // Default to first step

      switch (currentStep) {
        case "role-setup":
          prevStep = "account-info";
          break;
        case "coach-info":
          prevStep = "role-setup";
          break;
        case "team-manager-info":
          prevStep = "role-setup";
          break;
        case "referee-info":
          prevStep = "role-setup";
          break;
        case "team-setup":
          if (selectedRole === "coach") {
            prevStep = "coach-info";
          } else if (selectedRole === "team-manager") {
            prevStep = "team-manager-info";
          }
          break;
        case "membership":
          if (selectedRole === "coach" || selectedRole === "team-manager") {
            prevStep = "team-setup";
          } else if (selectedRole === "referee") {
            prevStep = "referee-info";
          } else if (selectedRole === "later") {
            prevStep = "role-setup";
          }
          break;
        case "review":
          prevStep = "membership";
          break;
      }

      setCurrentStep(prevStep);
      // Remove the current step from completed steps
      setCompletedSteps((prev) => prev.filter((step) => step !== currentStep));
    }
  };

  const goToStep = (targetStep: RegistrationStep) => {
    const stepOrder: RegistrationStep[] = [
      "account-info",
      "role-setup",
      "coach-info",
      "team-manager-info",
      "referee-info",
      "team-setup",
      "membership",
      "review",
    ];

    const currentStepIndex = stepOrder.indexOf(currentStep);
    const targetStepIndex = stepOrder.indexOf(targetStep);

    // Only allow navigation to completed or current steps
    if (
      targetStepIndex <= currentStepIndex ||
      completedSteps.includes(targetStep)
    ) {
      // Special handling for role-specific steps
      if (targetStep === "coach-info" && selectedRole !== "coach") return;
      if (targetStep === "team-manager-info" && selectedRole !== "team-manager")
        return;
      if (targetStep === "referee-info" && selectedRole !== "referee") return;
      if (
        targetStep === "team-setup" &&
        selectedRole !== "coach" &&
        selectedRole !== "team-manager"
      )
        return;

      setCurrentStep(targetStep);
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps: Array<{
      step: RegistrationStep;
      label: string;
      icon: React.ReactNode;
    }> = [
      {
        step: "account-info" as RegistrationStep,
        label: "Account Info",
        icon: <UserIcon className="w-6 h-6" />,
      },
      {
        step: "role-setup" as RegistrationStep,
        label: "Role Setup",
        icon: <UserCheckIcon className="w-6 h-6" />,
      },
      // Conditionally add role-specific steps
      ...(selectedRole === "coach"
        ? [
            {
              step: "coach-info" as RegistrationStep,
              label: "Coach Info",
              icon: <AwardIcon className="w-6 h-6" />,
            },
            {
              step: "team-setup" as RegistrationStep,
              label: "Team Setup",
              icon: <UsersIcon className="w-6 h-6" />,
            },
          ]
        : selectedRole === "team-manager"
        ? [
            {
              step: "team-manager-info" as RegistrationStep,
              label: "Manager Info",
              icon: <AwardIcon className="w-6 h-6" />,
            },
            {
              step: "team-setup" as RegistrationStep,
              label: "Team Setup",
              icon: <UsersIcon className="w-6 h-6" />,
            },
          ]
        : selectedRole === "referee"
        ? [
            {
              step: "referee-info" as RegistrationStep,
              label: "Referee Info",
              icon: <AwardIcon className="w-6 h-6" />,
            },
          ]
        : []),
      {
        step: "membership" as RegistrationStep,
        label: "Membership",
        icon: <ClipboardListIcon className="w-6 h-6" />,
      },
      {
        step: "review" as RegistrationStep,
        label: "Review",
        icon: <CheckCircle2Icon className="w-6 h-6" />,
      },
    ];

    return (
      <div className="flex justify-between items-center mb-8 relative">
        {steps.map((stepItem, index) => {
          const isCurrentStep = currentStep === stepItem.step;
          const isCompletedStep = completedSteps.includes(stepItem.step);
          const isPreviousStep =
            steps.findIndex((s) => s.step === currentStep) > index;

          // Add connecting line between steps
          const showConnectingLine = index < steps.length - 1;

          return (
            <div
              key={stepItem.step}
              className={`flex items-center ${
                index === steps.length - 1 ? "" : "flex-grow"
              }`}
            >
              {/* Step Container */}
              <div
                onClick={() => goToStep(stepItem.step)}
                className={`
                  flex flex-col items-center cursor-pointer group relative z-10
                  ${
                    isCurrentStep
                      ? "text-primary"
                      : isPreviousStep
                      ? "text-primary"
                      : "text-gray-400"
                  }
                  hover:opacity-80 transition-all flex-shrink-0
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2
                    ${
                      isCurrentStep
                        ? "bg-primary/10 border-2 border-primary"
                        : isPreviousStep
                        ? "bg-primary/20"
                        : "bg-gray-100"
                    }
                    group-hover:bg-primary/30
                  `}
                >
                  {stepItem.icon}
                </div>
                <span className="text-sm text-center">{stepItem.label}</span>
              </div>

              {/* Connecting Line */}
              {showConnectingLine && (
                <div
                  className={`
                    flex-grow h-0.5 mx-4
                    ${
                      isPreviousStep
                        ? "bg-primary"
                        : isCurrentStep && index === 0
                        ? "bg-primary"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "account-info":
        return (
          <PanelAccountInfo
            initialData={accountInfo}
            onSubmit={(data) => {
              setAccountInfo(data);
              setCurrentStep("role-setup");
              setCompletedSteps((prev) => [...prev, "account-info"]);
            }}
          />
        );
      case "role-setup":
        return (
          <PanelRoleSetup
            selectedRole={selectedRole}
            onRoleSelect={(role) => {
              setSelectedRole(role);
            }}
          />
        );
      case "coach-info":
        return (
          <PanelCoachInfo
            initialData={coachInfo}
            onSubmit={(data) => {
              // Store coach info and move to team setup
              setCoachInfo(data);
              setCurrentStep("team-setup");
              setCompletedSteps((prev) => [...prev, "coach-info"]);
            }}
          />
        );
      case "team-manager-info":
        return (
          <PanelTeamManagerInfo
            onSubmit={(data) => {
              setTeamManagerInfo(data);
              nextStep();
            }}
          />
        );
      case "referee-info":
        return (
          <PanelRefereeInfo
            onSubmit={(data) => {
              setRefereeInfo(data);
              nextStep();
            }}
          />
        );
      case "team-setup":
        return (
          <PanelTeamSetup
            sport={
              coachInfo.sport || {
                name: "",
                isActive: 1,
                ord: 0,
              }
            }
            club={
              coachInfo.club || {
                name: "",
                status: "active",
                ord: 0,
              }
            }
            team={
              coachInfo.team || {
                name: "",
                clubId: undefined,
                sportId: undefined,
                leagueId: undefined,
                ageGroup: undefined,
                status: 1,
                base64: undefined,
              }
            }
            initialPlayers={players}
            onPlayersUpdate={(updatedPlayers) => {
              setPlayers(updatedPlayers);
              // nextStep();
            }}
          />
        );
      case "membership":
        return (
          <PanelMembership
            selectedMembership={selectedMembership}
            onMembershipSelect={onMembershipSelect}
          />
        );
      case "review":
        return (
          <div className="space-y-6">
            <PanelReview
              accountInfo={accountInfo}
              selectedRole={selectedRole}
              selectedMembership={selectedMembership}
              onSubmit={handleFinalSubmit}
            />

            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <Button variant="outline" onClick={prevStep} className="px-6">
                Previous
              </Button>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  className="text-primary focus:ring-primary"
                  checked={termsAgreed}
                  onChange={() => setTermsAgreed(!termsAgreed)}
                />
                <label
                  htmlFor="terms-agreement"
                  className="text-primary text-sm cursor-pointer select-none"
                >
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <Button
                onClick={handleFinalSubmit}
                disabled={!termsAgreed}
                className="px-6"
              >
                <CheckIcon className="w-5 h-5" />
                Complete
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const onMembershipSelect = (membership: MembershipTier) => {
    setSelectedMembership(membership);
  };

  // Modify handleFinalSubmit to use AuthService
  const handleFinalSubmit = async () => {
    if (!termsAgreed) {
      toast.error("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    // Validate required fields
    if (!accountInfo.email || !accountInfo.password || !selectedRole) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Use AuthService to register
      const registrationData = {
        email: accountInfo.email,
        firstName: accountInfo.first_name || "",
        lastName: accountInfo.last_name || "",
        password: accountInfo.password,
        role: selectedRole,
      };

      const response = await AuthService.register(registrationData);

      // Show success toast
      toast.success("Registration successful!");

      // Redirect to appropriate dashboard based on role
      switch (selectedRole) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "COACH":
          router.push("/coach/dashboard");
          break;
        case "TEAM_MANAGER":
          router.push("/team-manager/dashboard");
          break;
        case "REFEREE":
          router.push("/referee/dashboard");
          break;
        case "PLAYER":
          router.push("/player/dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error) {
      // Handle registration errors
      if (error.response) {
        // Server responded with an error
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        // Request made but no response received
        toast.error("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request
        toast.error("An unexpected error occurred");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Register Background"
          fill
          className="bg-black object-cover"
        />
      </div>

      {/* Register Container */}
      <div className="relative z-10 bg-white/90 shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full mx-4">
        <div className="p-12">
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Current Step Content */}
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          {(currentStep as string) !== "review" && (
            <div className="flex items-center justify-between mt-4 border-t pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === "account-info"}
                className="px-6"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back
              </Button>

              {/* Message area for Role Setup */}
              {currentStep === "role-setup" && selectedRole === "later" && (
                <div className="text-sm text-primary text-center flex-grow mx-4 bg-blue-50 p-2 rounded-lg flex items-center justify-center">
                  <InfoIcon className="w-5 h-5 mr-2" />
                  You can complete your role setup in your profile settings
                  after registration.
                </div>
              )}

              {/* Annual Discount Message for Membership */}
              {currentStep === "membership" && (
                <div className="text-sm text-green-600 text-center flex-grow mx-4 bg-green-50 p-2 rounded-lg flex items-center justify-center">
                  <TrendingUpIcon className="w-5 h-5 mr-2" />
                  Pro plan offers 20% discount when billed annually
                </div>
              )}

              <Button
                onClick={() => {
                  if (
                    currentStep === "account-info" ||
                    currentStep === "coach-info"
                  ) {
                    // Trigger form validation
                    const form = document.querySelector(
                      "form"
                    ) as HTMLFormElement;
                    if (form) {
                      const submitButton = form.querySelector(
                        'button[type="submit"]'
                      ) as HTMLButtonElement;
                      if (submitButton) {
                        submitButton.click();
                      }
                    }
                  } else {
                    // For other steps, use existing nextStep logic
                    nextStep();
                  }
                }}
                className={`
                    px-6 
                    ${currentStep === "account-info" ? "ml-auto" : ""}
                  `}
              >
                Forward
                <ArrowRightIcon className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
