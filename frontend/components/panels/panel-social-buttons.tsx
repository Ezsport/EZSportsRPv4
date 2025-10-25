"use client";

import { Button } from "@/components/controls/button";
import {
  Facebook,
  Github,
  Globe,
  Grid2x2,
  Instagram,
  Linkedin,
  Podcast,
  Twitter,
  WindIcon,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialButtonsPanelProps {
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
  onGithubClick?: () => void;
  onLinkedinClick?: () => void;
  onTwitterClick?: () => void;
  onInstagramClick?: () => void;
  onPinterestClick?: () => void;
  isLoading?: boolean;
}

export const PanelSocialButtons = ({
  onGoogleClick,
  onFacebookClick,
  onGithubClick,
  onLinkedinClick,
  onTwitterClick,
  onInstagramClick,
  onPinterestClick,
  isLoading = false,
}: SocialButtonsPanelProps) => {
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const socialLogins = [
    {
      name: "Google",
      icon: <Globe />,
      color: "bg-[#DB4437]", // Google red
      onClick: onGoogleClick,
    },
    {
      name: "Microsoft",
      icon: <Grid2x2 />,
      color: "bg-[#0078D4]", // Microsoft blue
      onClick: onGithubClick,
    },
    {
      name: "Facebook",
      icon: <Facebook />,
      color: "bg-[#1877F2]", // Facebook blue
      onClick: onFacebookClick,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      color: "bg-[#0A66C2]", // LinkedIn blue
      onClick: onLinkedinClick,
    },
    {
      name: "Twitter",
      icon: <Twitter />,
      color: "bg-[#1DA1F2]", // Twitter (X) blue
      onClick: onTwitterClick,
    },
    {
      name: "Github",
      icon: <Github />,
      color: "bg-[#24292F]", // GitHub dark gray
      onClick: onPinterestClick,
    },
  ];

  const handleClick = (social: {
    name: string;
    icon: React.ReactNode;
    color: string;
    onClick?: () => void;
  }) => {
    // Set loading state for the specific button
    setLoadingButton(social.name);

    // Simulate an async operation
    setTimeout(() => {
      try {
        // Call the specific onClick handler if provided
        if (social.onClick) {
          social.onClick();
        }

        // Show a toast notification
        toast.success(`Login with ${social.name}`, {
          position: "top-center",
          closeButton: false,
          richColors: true,
          description: "Social login feature is coming soon!",
        });
      } catch (error) {
        toast.error(`${social.name} login failed`, {
          description: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setLoadingButton(null);
      }
    }, 1000);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {socialLogins.map((social) => (
        <Button
          key={social.name}
          variant="outline"
          className={`
            flex items-center justify-center 
            text-white ${social.color}
            hover:primary border-none 
            hover:text-white 
            relative shadow-md
          `}
          onClick={() => handleClick(social)}
          disabled={isLoading || loadingButton !== null}
        >
          {loadingButton === social.name ? (
            <Loader2 className="animate-spin" />
          ) : (
            social.icon
          )}
          <span>{social.name}</span>
        </Button>
      ))}
    </div>
  );
};
