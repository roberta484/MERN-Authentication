export const VerificationEmailTemplate = (verificationCode: string) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Verify Your Account</h2>
        <p>Hi there,</p>
        <p>Thank you for signing up! To complete your registration, please verify your account using the code below:</p>
        <div style="background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px; padding: 15px; text-align: center;">
          <h3 style="font-size: 24px; color: #4CAF50; margin: 0;">${verificationCode}</h3>
          <p style="font-size: 14px; color: #777;">(This code will expire in 1 hour)</p>
        </div>
        <p>Enter this code on the verification page to get started.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p style="font-size: 12px; color: #888;">
          Please do not reply to this email. If you have any questions, feel free to contact our support team.
        </p>
        <p>Best regards,<br>MERN Authentication Team</p>
      </div>
    `;
};

export const WelcomeEmailTemplate = (username: string, email: string) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Welcome to Our Community, ${username}!</h2>
        <p>Hi ${username},</p>
        <p>Thank you for verifying your email address: <strong>${email}</strong>. We're excited to have you on board!</p>
        <p>Here are a few things you can do next:</p>
        <ul style="margin: 0; padding: 0; list-style-type: none;">
          <li>🌟 <strong>Explore:</strong> Check out our features and see what we offer!</li>
          <li>📄 <strong>Profile Setup:</strong> Complete your profile to get personalized recommendations.</li>
          <li>💬 <strong>Join Discussions:</strong> Engage with other members in our community forums.</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>
        <p style="font-size: 12px; color: #888;">
          Please do not reply to this email. For assistance, contact support through our website.
        </p>
        <p>Best regards,<br>MERN Authentication Team</p>
      </div>
    `;
};

export const ResetPasswordEmailTemplate = (
  resetLink: string,
  email: string
) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Password Reset Request</h2>
        <p>Hi there,</p>
        <p>We received a request to reset your password for your account associated with <strong>${email}</strong>.</p>
        <p>Please click the link below to reset your password:</p>
        <div style="background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 5px; padding: 15px; text-align: center;">
          <a href="${resetLink}" style="font-size: 18px; color: #4CAF50; text-decoration: none;">Reset Your Password</a>
        </div>
        <p>If you didn't request this, please ignore this email. Your password will not change until you access the link above and create a new one.</p>
        <p style="font-size: 12px; color: #888;">
          Please do not reply to this email. For assistance, contact support through our website.
        </p>
        <p>Best regards,<br>MERN Authentication Team</p>
      </div>
    `;
};

export const ResetSuccessEmailTemplate = (email: string) => {
  return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Your Password Has Been Reset Successfully</h2>
          <p>Hi there,</p>
          <p>This is to confirm that your password for the account associated with <strong>${email}</strong> has been successfully reset.</p>
          <p>If you did not make this change, please contact our support team immediately to secure your account.</p>
          <p>Thank you for using our service!</p>
          <p style="font-size: 12px; color: #888;">
            Please do not reply to this email. For assistance, contact support through our website.
          </p>
          <p>Best regards,<br>MERN Authentication Team</p>
        </div>
      `;
};
