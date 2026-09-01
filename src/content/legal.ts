/*
  Terms and Privacy, verbatim from the frames.

  design/site/web/home-web-T&C1..5.png · design/site/mobile/home-mobile-T&C1..9.png
  design/site/web/home-web-privacy-policy1..4.png · design/site/mobile/home-mobile-privacy1..5.png

  Both pages are the same layout — title, red "last updated" line, a lead
  paragraph, then headed sections with a sticky contents rail on the right — so
  they share one renderer and differ only in this data. Terms numbers its
  headings; Privacy does not.

  `tocLabel` exists because the rail does NOT repeat the headings: the frame
  shortens them ("Subscription and payment" for "3. Subscription tiers and
  payment", "Data ownership and IP" for "5. Data ownership and intellectual
  property", "Security and encryption" for "Security"). Both strings are kept
  rather than derived, because there is no rule connecting them.
*/

export type LegalBlock =
  | { kind: "paragraph"; text: string }
  /** `plain` drops the bullet markers — section 4 of the Terms is written that way. */
  | { kind: "list"; style?: "bullet" | "plain"; items: string[] };

export type LegalSection = {
  /** Anchor target for the contents rail. */
  id: string;
  heading: string;
  tocLabel: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  lastUpdated: string;
  intro: string;
  /** Terms prefixes each heading with its position; Privacy does not. */
  numbered: boolean;
  sections: LegalSection[];
};

export const TERMS: LegalDocument = {
  title: "Terms and Conditions",
  lastUpdated: "Last updated 31st July, 2026",
  intro:
    'These Terms and Conditions ("Terms") govern your organisation\'s access to and use of the TDARS Digital Archive System ("Platform"), operated by TDARS Technologies Ltd. By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, do not access or use the Platform.',
  numbered: true,
  sections: [
    {
      id: "definitions-and-scope",
      heading: "Definitions and scope",
      tocLabel: "Definitions and scope",
      blocks: [
        {
          kind: "list",
          items: [
            '"Platform" refers to the TDARS Digital Archive System, including all software, infrastructure, APIs, and documentation provided by TDARS Technologies Ltd.',
            '"Hub" refers to the isolated tenant environment provisioned for your organisation, containing all your data, configurations, users, and records.',
            '"Hub Administrator" refers to the designated individual(s) within your organisation responsible for managing the Hub, including user roles, permissions, module configurations, and billing.',
            '"Authorized User" refers to any individual granted access to a Hub by the Hub Administrator, subject to role-based permissions.',
            '"Documents" refers to all files, scans, images, records, and data uploaded, ingested, or generated within the Platform.',
            '"Services" refers to the four core modules TDARS Scan (document digitisation), TDARS Records (personnel record management), TDARS MockRadar (practice examinations), and TDARS CBT (proctored computer-based testing) and any additional features made available under your subscription tier.',
          ],
        },
      ],
    },
    {
      id: "account-registration-and-access",
      heading: "Account registration and access",
      tocLabel: "Account registration and access",
      blocks: [
        {
          kind: "list",
          items: [
            "Access to the Platform is by invitation only. Organisations must submit a service request and be approved by the TDARS integration team before a Hub is provisioned.",
            "The Hub Administrator is responsible for all activity within their Hub, including user management, role assignments, and compliance with these Terms.",
            "Each Authorised User must have a unique account. Sharing credentials is strictly prohibited and may result in immediate suspension of the affected accounts.",
            "You are responsible for maintaining the confidentiality of all login credentials associated with your Hub. TDARS is not liable for unauthorised access resulting from your failure to safeguard credentials.",
            "TDARS reserves the right to suspend or terminate access to any Hub or user account that violates these Terms, poses a security risk, or is subject to a valid legal order.",
          ],
        },
      ],
    },
    {
      id: "subscription-tiers-and-payment",
      heading: "Subscription tiers and payment",
      tocLabel: "Subscription and payment",
      blocks: [
        {
          kind: "paragraph",
          text: "The Platform is offered under three subscription tiers: Essential (up to 50 users, 3 modules), Business (up to 300 users, 3 modules), and Executive (unlimited users, 4 modules including TDARS Records). Module availability, user limits, and storage allocations are determined by your subscription tier.",
        },
        {
          kind: "paragraph",
          text: "Subscription fees are billed monthly in advance. All fees are quoted in Nigerian Naira (₦) unless otherwise agreed in writing. Late payments exceeding 15 calendar days may result in temporary suspension of non-critical platform features.",
        },
        {
          kind: "paragraph",
          text: "TDARS reserves the right to adjust pricing with 60 days' written notice. Continued use of the Platform after the effective date of a price change constitutes acceptance of the new pricing.",
        },
        {
          kind: "paragraph",
          text: "Downgrading your subscription tier may result in loss of access to modules, features, or data that exceed the limits of the new tier. TDARS will provide 30 days' notice before any data affected by a downgrade is archived or removed.",
        },
        {
          kind: "paragraph",
          text: "Refunds are not provided for partial billing periods, except where required by applicable law.",
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      tocLabel: "Acceptable use",
      blocks: [
        {
          kind: "paragraph",
          text: "You agree to use the Platform only for lawful purposes consistent with its intended function as a secure digital archive and personnel records management system. You shall not:",
        },
        {
          kind: "list",
          style: "plain",
          items: [
            "Upload, store, or process any content that violates applicable laws, regulations, or third-party rights",
            "Attempt to access, probe, or test the vulnerability of the Platform or any connected system without express written authorisation from TDARS",
            "Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Platform",
            "Use the Platform to store or distribute malware, ransomware, or any malicious software",
            "Share, resell, sublicense, or otherwise make the Platform available to any third party without TDARS's prior written consent",
            "Circumvent, disable, or interfere with any security, access control, or audit mechanism of the Platform",
            "Use automated scripts, bots, or scrapers to extract data from the Platform except through authorised API endpoints",
          ],
        },
        {
          kind: "paragraph",
          text: "Violations of this section may result in immediate suspension, termination of your Hub, and referral to relevant authorities where applicable.",
        },
      ],
    },
    {
      id: "data-ownership-and-intellectual-property",
      heading: "Data ownership and intellectual property",
      tocLabel: "Data ownership and IP",
      blocks: [
        {
          kind: "list",
          items: [
            "Your organisation retains full ownership of all Documents, records, and data uploaded or generated within your Hub. TDARS does not claim ownership of your content.",
            "TDARS retains all rights, title, and interest in the Platform itself, including its software, algorithms, user interface designs, documentation, trade marks, and proprietary technology.",
            "You grant TDARS a limited, non-exclusive licence to process your data solely for the purpose of providing the Services — including OCR processing, document classification, forgery detection, personnel matching, and generating analytics.",
            "No rights are granted to TDARS to use your data for training machine learning models, benchmarking, or any purpose beyond delivering the Services to your Hub.",
            "Upon termination or expiration of your subscription, your data remains available for export for 90 days, after which it will be securely destroyed in accordance with our Data Retention Policy.",
          ],
        },
      ],
    },
    {
      id: "security-and-compliance-obligations",
      heading: "Security and compliance obligations",
      tocLabel: "Security and compliance",
      blocks: [
        {
          kind: "paragraph",
          text: "TDARS implements defence-grade security measures including AES-256 encryption at rest, TLS 1.3 encryption in transit, complete tenant isolation per Hub (separate database instances, no shared namespaces), zero-trust role boundaries with dual-approver access controls, immutable audit trails recording every system action, and support for cloud, on-premise, and air-gapped deployment configurations.",
        },
        {
          kind: "paragraph",
          text: "Your organisation is responsible for: ensuring that Authorised Users comply with your internal security policies; configuring appropriate role-based access controls within your Hub; promptly reporting any suspected security incidents to security@tdars.com; maintaining the physical security of scanner hardware, USB devices, and any on-premise infrastructure connected to the Platform.",
        },
        {
          kind: "paragraph",
          text: "TDARS will notify affected organisations within 72 hours of confirming a data breach that may compromise the confidentiality, integrity, or availability of your data, in compliance with applicable data protection regulations.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      tocLabel: "Limitation of liability",
      blocks: [
        {
          kind: "paragraph",
          text: "To the maximum extent permitted by law, TDARS shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or related to your use of the Platform, including but not limited to loss of data, loss of revenue, business interruption, or reputational harm.",
        },
        {
          kind: "paragraph",
          text: "TDARS's total aggregate liability for any claims arising under these Terms shall not exceed the total fees paid by your organisation in the 12 months preceding the event giving rise to the claim.",
        },
        {
          kind: "paragraph",
          text: 'TDARS does not guarantee that the Platform will be error-free, uninterrupted, or free from security vulnerabilities. The Platform is provided on an "as is" and "as available" basis.',
        },
        {
          kind: "paragraph",
          text: "Nothing in these Terms excludes or limits liability for death, personal injury caused by negligence, fraud, or any liability that cannot be excluded by applicable law.",
        },
      ],
    },
    {
      id: "governing-law-and-dispute-resolution",
      heading: "Governing law and dispute resolution",
      tocLabel: "Governing law and disputes",
      blocks: [
        {
          kind: "paragraph",
          text: "These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute arising out of or in connection with these Terms shall first be referred to mediation under the Lagos Court of Arbitration rules.",
        },
        {
          kind: "paragraph",
          text: "If mediation fails to resolve the dispute within 60 days, either party may submit the dispute to binding arbitration under the Arbitration and Conciliation Act (Cap A18, Laws of the Federation of Nigeria, 2004). The seat of arbitration shall be Lagos, Nigeria, and proceedings shall be conducted in English. Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual property or confidential information. For questions about these Terms, contact legal@tdars.io or your designated account manager.",
        },
      ],
    },
  ],
};

export const PRIVACY: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "Last updated 31st July, 2026",
  intro:
    "This policy explains what information TDARS collects from organisations, administrators, and users who access the TDARS Digital Archive System, how we use it, and the choices you have.",
  numbered: false,
  sections: [
    {
      id: "information-we-collect",
      heading: "Information we collect",
      tocLabel: "Information we collect",
      blocks: [
        {
          kind: "list",
          items: [
            "Organisation profile: name, sector, deployment type, Hub configuration, and administrator contact details",
            "User identity: full name, email address, role, service ID, and biometric identifiers (where enabled for personnel matching)",
            "Documents and records: all files uploaded, scanned, or ingested into the archive — including metadata, OCR-extracted text, classification tags, and approval history",
            "Device and access data: IP address, browser fingerprint, session timestamps, and geolocation used to enforce access policies and detect anomalies",
            "Audit trail data: every action performed within the system, including views, edits, exports, approvals, and permission changes",
          ],
        },
      ],
    },
    {
      id: "how-we-use-this-information",
      heading: "How we use this information",
      tocLabel: "How we use this information",
      blocks: [
        {
          kind: "list",
          items: [
            "To verify user identity and enforce role-based access controls within each Hub",
            "To process, classify, and store documents using OCR, forgery detection, and automated indexing",
            "To link records to personnel profiles using name, service ID, and biometric matching",
            "To maintain complete audit trails for regulatory compliance and institutional accountability",
            "To monitor system health, scanner connectivity, and processing performance",
            "To communicate platform updates, security alerts, and policy changes to administrators",
          ],
        },
      ],
    },
    {
      id: "how-information-is-shared",
      heading: "How information is shared",
      tocLabel: "Data sharing and isolation",
      blocks: [
        {
          kind: "paragraph",
          text: "TDARS operates under strict data isolation. Each organisation's Hub runs in a completely separate environment with no shared databases or cross-tenant access. We do not sell, share, or transfer your data to third parties. Document contents and personnel records are never accessible outside your Hub. We may disclose limited technical or account information to law enforcement only when required by valid legal process under applicable Nigerian law or the jurisdiction governing your deployment.",
        },
      ],
    },
    {
      id: "data-retention",
      heading: "Data retention",
      tocLabel: "Data retention",
      blocks: [
        {
          kind: "paragraph",
          text: "Documents, personnel records, and audit logs are retained for as long as your organisation's Hub is active and for a minimum retention period afterward as required by applicable records management regulations. Audit trails are immutable and cannot be modified or deleted. Upon Hub decommissioning, all data is securely wiped following certified data destruction protocols, and a destruction certificate is issued to the organisation.",
        },
      ],
    },
    {
      id: "your-rights-and-choices",
      heading: "Your rights and choices",
      tocLabel: "Your rights and choices",
      blocks: [
        {
          kind: "list",
          items: [
            "Request a full export of your organisation's data in standard archival formats",
            "Request deletion of your Hub and all associated data, subject to mandatory retention periods",
            "Manage user access, roles, and permissions through your Hub administration panel",
            "Review and audit all system activity through the built-in audit log",
            "Appeal access decisions or escalate data concerns through the designated Data Protection Officer",
          ],
        },
      ],
    },
    {
      id: "security",
      heading: "Security",
      tocLabel: "Security and encryption",
      blocks: [
        {
          kind: "paragraph",
          text: "TDARS is built with security as a foundational requirement, not an add-on. All records are encrypted at rest using AES-256 and in transit using TLS 1.3. Each Hub operates in complete tenant isolation with no shared infrastructure. Role-based access is enforced through zero-trust boundaries — even system administrators cannot access records without dual-approver authorisation. Backup archives use physically disconnected encryption keys. The platform supports cloud, on-premise, and air-gapped deployments to meet your organisation's specific security posture.",
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      heading: "Changes to this policy",
      tocLabel: "Changes to this policy",
      blocks: [
        {
          kind: "paragraph",
          text: "If we make material changes to this policy, we will notify all Hub administrators via the platform notification system and email. Continued use of the platform after notification constitutes acceptance of the updated terms. Previous versions of this policy are archived and available upon request.",
        },
      ],
    },
    {
      id: "contact-us",
      heading: "Contact us",
      tocLabel: "Contact us",
      blocks: [
        {
          kind: "paragraph",
          text: "Questions about this policy or data handling practices can be directed to privacy@tdars.com, or through your organisation's designated account manager.",
        },
      ],
    },
  ],
};
