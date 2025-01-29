const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">
        Last Updated: {new Date("2025-01-29").toLocaleDateString()}
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. Introduction</h2>
      <p className="text-gray-700 mb-4">
        Welcome to Cally. Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information when you use our application.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Information We Collect</h2>
      <p className="text-gray-700 mb-4">
        When you use our app, we request access to your Google Calendar to view and edit your
        events. We do not collect or store any personal information beyond what is necessary for the
        app&apos;s functionality.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>To display and manage your Google Calendar events within our app.</li>
        <li>To provide features such as event creation, modification, and deletion.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Data Security</h2>
      <p className="text-gray-700 mb-4">
        We take appropriate security measures to protect your data from unauthorized access or
        disclosure. However, please note that no system is completely secure, and we cannot
        guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Third-Party Services</h2>
      <p className="text-gray-700 mb-4">
        Our app integrates with Google Calendar via the Google Calendar API. We adhere to
        Google&apos;s policies regarding data access and usage. You can review Google&apos;s Privacy
        Policy at{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Google Privacy Policy
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">6. Your Choices</h2>
      <p className="text-gray-700 mb-4">
        You can revoke our app&apos;s access to your Google Calendar at any time via your Google
        Account settings.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">7. Changes to This Policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Privacy Policy periodically. Any changes will be posted on this page with
        the updated date.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">8. Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <strong>anujthakur2003.anuj@gmail.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
