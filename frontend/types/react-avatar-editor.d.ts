declare module 'react-avatar-editor' {
  import React from 'react';

  interface AvatarEditorProps {
    image: string | File;
    width?: number;
    height?: number;
    border?: number | [number, number];
    borderRadius?: number;
    color?: number[];
    scale?: number;
    rotate?: number;
    position?: { x: number; y: number };
    onPositionChange?: (position: { x: number; y: number }) => void;
    className?: string;
    style?: React.CSSProperties;
    crossOrigin?: string;
    onLoadSuccess?: (imgInfo: { width: number; height: number }) => void;
    onLoadFailure?: (event: Event) => void;
  }

  declare class AvatarEditor extends React.Component<AvatarEditorProps> {
    getImageScaledToCanvas(): HTMLCanvasElement;
    getCroppingRect(): { x: number; y: number; width: number; height: number };
  }

  export default AvatarEditor;
}
