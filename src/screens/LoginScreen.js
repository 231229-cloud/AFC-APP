import React from 'react';
import { AuthTemplate } from '../components/templates/AuthTemplate';
import { Logo } from '../components/atoms/Logo';
import { TabSwitch } from '../components/molecules/TabSwitch';
import { LoginForm } from '../components/organisms/LoginForm';
import { SocialLoginGroup } from '../components/molecules/SocialLoginGroup';

export const LoginScreen = ({ navigation }) => {
  return (
    <AuthTemplate
      header={<Logo />}
      form={
        <>
          <TabSwitch />
          <LoginForm navigation={navigation} />
        </>
      }
      social={<SocialLoginGroup />}
      footerText="AFC Athlete Functional Center © 2025"
    />
  );
};