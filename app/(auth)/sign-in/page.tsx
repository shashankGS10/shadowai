import React from 'react'
import RotatingMusicVisualizer from "@/shadowai/components/RotatingMusicVisualizer";
import AuthForm from "@/shadowai/components/AuthForm";

const SignIn = () => (
  <div className="relative flex items-center justify-center min-h-screen">
    
    <RotatingMusicVisualizer />
    
    <div className="relative z-30">
        <AuthForm type="sign-in" />
      </div>
  </div>
);

export default SignIn;