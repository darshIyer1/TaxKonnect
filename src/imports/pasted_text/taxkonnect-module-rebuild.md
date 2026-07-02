Continue editing the CURRENT TaxKonnect project. Preserve the existing visual system, research content, marketplace logic, matching/ranking screens, transaction-services work, and strong existing screens.

Do not restart or create a disconnected concept.

# PRIMARY OBJECTIVE: REBUILD THE PRODUCT AS THREE SEPARATE MODULES

The current prototype incorrectly combines the seller, buyer, and TaxKonnect team into one shared guided sequence.

Replace that structure with three distinct product modules:

1. **Seller Module**
2. **Buyer Module**
3. **Admin Module**

Each module needs its own:

* Authentication entry
* Dashboard
* Navigation
* User journey
* Screens
* Tasks
* Progress indicators
* Empty states
* Locked states
* Notifications
* Wireframe set
* High-fidelity prototype flow

Do not present one combined 21-step or 22-step walkthrough as the primary UX.

The three parties participate in the same transaction, but they interact with it through separate role-specific experiences.

A shared deal timeline may still exist, but each user should only see:

* Their relevant actions
* Their relevant status
* What they are waiting for
* What TaxKonnect or the other party is doing
* Their next permitted action

Normal navigation must not automatically advance the transaction.

# 1. APPLICATION STRUCTURE

Create four clear entry areas:

## Public Website

For unauthenticated visitors.

## Seller Portal

For accounting-practice owners and authorized seller representatives.

## Buyer Portal

For approved individual and organizational buyers.

## TaxKonnect Admin Portal

For TaxKonnect deal leads, analysts, reviewers, and authorized administrators.

Do not use one role-switching sidebar as the final real-world architecture.

A role switcher may remain only as a clearly labeled prototype demonstration control.

# 2. SELLER MODULE

Create a complete seller-specific UX and separate wireframe flow.

Seller navigation:

* Dashboard
* Practice Profile
* Documents
* Readiness Review
* Listing Preview
* Buyer Recommendations
* Access Requests
* Offers
* Due Diligence
* Transaction Services
* Closing and Transition
* Messages
* Notifications
* Account Settings
* Help and Contact TaxKonnect

Seller journey:

1. Register and verify account
2. Submit seller interest
3. Complete practice and ownership information
4. Upload required documents
5. Work with TaxKonnect on readiness
6. Review and approve listing
7. Monitor listing status
8. Review recommended or requesting buyers
9. Approve, reject, delay, or ask for more information
10. Review released-document status
11. Compare offers
12. Participate in diligence
13. Select required transaction services
14. Complete closing-readiness tasks
15. Close and begin transition

Seller Dashboard must prioritize:

* Current sale stage
* Next seller action
* Assigned TaxKonnect deal lead
* What TaxKonnect is reviewing
* Missing information
* Document status
* Listing status
* Buyer requests requiring attention
* Current buyer access
* Offers
* Diligence
* Transaction-service providers
* Closing readiness
* Upcoming calls and deadlines

# 3. BUYER MODULE

Create a complete buyer-specific UX and separate wireframe flow.

Buyer navigation:

* Dashboard
* Buyer Profile
* Verification and Funding
* Marketplace
* Saved Listings
* Recommended Listings
* Access Requests
* NDAs
* Documents
* Offers
* Due Diligence
* Transaction Services
* Closing and Transition
* Messages
* Notifications
* Account Settings
* Help and Contact TaxKonnect

Buyer journey:

1. Register and verify account
2. Complete buyer or organization profile
3. Submit acquisition criteria
4. Submit funding and experience information
5. Receive TaxKonnect approval
6. Browse ranked anonymous listings
7. Open a specific anonymous listing
8. Submit a deal-specific access request
9. Sign the NDA
10. Wait for TaxKonnect review and seller decision
11. Receive selected documents
12. Submit an offer
13. Participate in diligence
14. Engage required advisers and financing
15. Complete closing-readiness tasks
16. Close and begin transition

Buyer Dashboard must prioritize:

* Account status
* Buyer approval
* Missing verification information
* Recommended and ranked listings
* Saved listings
* Pending access requests
* NDA status
* Documents released
* Questions requiring response
* Offer status
* Diligence
* Financing
* Transaction services
* Closing readiness
* Assigned TaxKonnect contact
* Next action

# 4. ADMIN MODULE

Rename the product-facing staff experience to:

**TaxKonnect Admin**

Create a complete admin-specific UX and separate wireframe flow.

Admin navigation:

* Admin Dashboard
* Seller Pipeline
* Seller Reviews
* Listings
* Buyer Pipeline
* Buyer Reviews
* Matching Analysis
* Ranked Shortlists
* Access Requests
* Document Releases
* Offers
* Due Diligence
* Transaction Services
* Closing Readiness
* Closed Transactions
* Tasks
* Messages
* Audit History
* Users and Permissions
* Platform Settings

Admin journey:

1. Review seller intake
2. Assign deal lead
3. Confirm ownership and authority
4. Review practice information and files
5. Conduct readiness review
6. Draft and approve listing
7. Review and approve buyer
8. Run matching analysis
9. Review ranked shortlist
10. Review deal-specific access request
11. Present buyer to seller
12. Release seller-approved documents
13. Coordinate questions and offers
14. Manage diligence
15. Coordinate transaction-service providers
16. Confirm closing readiness
17. Record closing and transition

Admin Dashboard must prioritize work requiring action:

* New seller inquiries
* Sellers missing information
* Readiness reviews
* Listings awaiting approval
* Buyers awaiting review
* Matching results requiring human review
* Access requests awaiting review
* Seller decisions pending
* Documents approved but not released
* Offers awaiting action
* Diligence issues
* Provider engagements
* Closing conditions
* Overdue tasks
* Assigned administrator
* Time since last activity

# 5. THREE SEPARATE WIREFRAME SETS

Reorganize the wireframe section into:

## Seller UX Wireframes

Show the seller’s navigation, dashboard, forms, files, readiness, listing approval, buyer review, offers, diligence, services, closing, and transition.

## Buyer UX Wireframes

Show registration, profile, approval, marketplace, rankings, listing detail, access request, NDA, documents, offer, diligence, services, financing, and closing.

## Admin UX Wireframes

Show the admin dashboard, seller review, buyer review, matching, ranking, access review, document release, offers, diligence, provider coordination, closing readiness, and audit history.

For every wireframe state:

* Purpose
* Information displayed
* Primary actions
* Prerequisite
* Result
* Next screen

Also include a separate shared authentication and public-site wireframe set.

# 6. SHARED TRANSACTION RECORD

The three modules must connect to one shared transaction record.

When one role acts, the other relevant modules should show the correct updated status.

Examples:

* Seller approves listing → Admin sees final listing approval ready
* Admin activates listing → Eligible buyers may see it
* Buyer requests access → Admin sees request awaiting review
* Admin recommends request → Seller sees buyer decision required
* Seller approves access → Admin sees document release permitted
* Admin releases files → Buyer sees selected documents
* Buyer submits offer → Seller and Admin see offer
* Seller accepts for diligence → All relevant modules show diligence opened
* Admin confirms closing readiness → Buyer and seller see ready-to-close status

Do not use a shared tutorial step number as the state model.

Use named transaction states and permissions.

# 7. WEBSITE AND AUTHENTICATION BOILERPLATE

Add the normal public, account, security, legal, and support screens required for a credible website.

## Public Website

Create:

* Home
* How It Works
* For Sellers
* For Buyers
* Transaction Services
* About TaxKonnect
* Contact
* Help Center / FAQ
* Sign In
* Create Account

The public website should explain the product without revealing confidential listings or claiming guaranteed outcomes.

## Registration

Create separate registration paths for:

* Seller
* Buyer

Admin accounts are invitation-only.

Registration must include:

* First name
* Last name
* Email
* Phone
* Password
* Confirm password
* Role
* Organization or practice name when applicable
* Agreement to Terms of Use
* Acknowledgment of Privacy Policy
* CAPTCHA or anti-bot verification
* Create Account button

Do not imply that registration automatically creates approval, access, or a professional relationship.

## Email Verification

Create:

* Verification email sent screen
* Enter verification code screen
* Resend verification email
* Expired code state
* Successful verification state

## Sign In

Create:

* Email
* Password
* Remember me
* CAPTCHA when risk or repeated attempts require it
* Sign In
* Forgot Password
* Create Account
* Incorrect credentials state
* Locked account state
* Too many attempts state

## Forgot and Reset Password

Create:

* Request reset link
* Reset email sent
* Expired link
* New password
* Confirm new password
* Password-strength requirements
* Successful reset
* Return to sign in

## Multi-Factor Authentication

Include:

* MFA setup
* Verification code
* Backup-code option
* Recovery state

Require or strongly encourage MFA for Admin users.

## Account Settings

Include:

* Personal information
* Organization information
* Change email
* Change password
* MFA
* Notification preferences
* Communication preferences
* Active sessions
* Sign out of other sessions
* Download personal data request
* Account-deletion request
* Sign Out

## CAPTCHA and Anti-Abuse States

Use CAPTCHA or equivalent anti-bot verification on:

* Registration
* Password-reset requests when appropriate
* Repeated failed sign-in attempts
* Public contact form

Do not place unnecessary CAPTCHA friction inside normal authenticated transaction work.

# 8. LEGAL, POLICY, AND STANDARD WEBSITE PAGES

Create credible placeholder pages for:

* Terms of Use
* Privacy Policy
* Cookie Policy
* Accessibility Statement
* Security and Confidentiality Overview
* Professional-Services Disclaimer
* Electronic Communications Consent
* Acceptable Use Policy
* Data and Account Deletion Request
* Contact and Support

Include a footer linking to these pages.

Add cookie-consent controls:

* Accept All
* Reject Nonessential
* Manage Preferences
* Essential Cookies explanation

Do not invent final legal promises.

Clearly label legal copy as prototype content requiring counsel review.

# 9. STANDARD SYSTEM STATES

Add:

* 404 Not Found
* 403 Access Denied
* 500 Error
* Maintenance Mode
* Session Expired
* Unsaved Changes
* Offline / Connection Problem
* Empty Notifications
* No Search Results
* Account Pending Approval
* Account Restricted
* Account Rejected
* Permission Required
* File Upload Failed
* Unsupported File Type
* File Too Large
* Confirmation dialog for sensitive actions

# 10. NOTIFICATIONS AND COMMUNICATIONS

Create an in-product notification center.

Examples:

Seller:

* TaxKonnect requested another document
* Listing draft ready for review
* Buyer access decision required
* New offer received
* Diligence item due

Buyer:

* Profile approved
* New recommended listing
* Access request under review
* Seller approved access
* Documents released
* Offer response received

Admin:

* New seller inquiry
* Buyer verification submitted
* Access request ready for review
* Seller approved buyer
* Document release pending
* Closing condition overdue

Include realistic preferences for:

* Email
* In-product
* Optional SMS for critical events

# 11. MAKE MATCHING AND RANKING FUNCTIONAL

Implement two separate deterministic prototype functions.

## Matching Function

Create the equivalent of:

computeMatch(buyer, listing)

First evaluate hard eligibility:

* Active listing
* Approved buyer
* Permitted buyer type
* Geography
* Deal-size overlap
* Funding capacity
* Conflict status
* Timing
* Transition compatibility

Return:

* Eligible
* Ineligible
* Needs Review

For eligible or reviewable pairs, calculate internal fit using:

* Geography: 15%
* Deal size: 15%
* Service-line fit: 15%
* Funding readiness: 15%
* Accounting/tax experience: 10%
* Acquisition experience: 10%
* Operating experience: 5%
* Timing: 5%
* Transition: 5%
* Strategic rationale: 5%

Return:

* Strong Fit
* Possible Fit
* Weak Fit
* Why Matched
* Gaps
* Failed hard checks
* Last evaluated

Internal score may be visible to Admin only.

## Ranking Function

Create the equivalent of:

rankMatches(eligibleMatches, context)

Use:

* Match result
* Funding-review status
* Buyer/listing readiness
* Timing urgency
* Request completeness
* Responsiveness
* Recent relevant activity
* Seller preferences
* Demonstrated interest

Rank:

* Listings for a buyer
* Buyers for a listing

Changing prototype inputs must update:

* Eligibility
* Match Strength
* Why Matched
* Gaps
* Rank
* Why Ranked Here
* Ranked Shortlist order

Clearly preserve:

**Matching determines compatibility. Ranking determines order.**

Neither grants access or replaces Admin review or seller choice.

# 12. ADMIN MATCHING DEMO

Inside Admin → Matching Analysis, add a restrained collapsible Prototype Inputs panel.

Allow changes to:

* Funding reviewed
* Geography aligned
* Timing aligned
* Transition aligned
* Accounting experience
* Buyer interest

The results and shortlist must recalculate visibly.

Keep separate:

* Algorithmically matched
* Ranked
* Admin reviewed
* Recommended
* Access requested
* Specific request reviewed

# 13. TRANSACTION SERVICES

Preserve and integrate:

* Transaction Counsel
* M&A and Deal Advisory
* Accounting and Tax Advisory
* Financing Coordination
* Escrow and Closing Administration
* Employee, Client, and Transition Planning

Show these differently in each module:

Seller:

* Providers required
* Introductions
* Scope
* Engagement
* Seller tasks
* Fees or engagement status
* Closing requirements

Buyer:

* Counsel
* Financing
* Accounting/tax work
* Buyer tasks
* Lender requirements
* Closing requirements

Admin:

* Provider coordination
* Engagement status
* Required documents
* Milestones
* Open issues
* Responsible party
* Deadlines

Do not imply TaxKonnect automatically provides regulated professional services.

# 14. CLOSING READINESS

Do not make closing automatic after diligence.

Create a distinct Closing Readiness stage containing:

* Definitive agreement
* Disclosure schedules
* Financing approval
* Working-capital agreement
* Escrow
* Regulatory or license transfers
* Required signatures
* Funds flow
* Legal open items
* Accounting/tax open items
* Client communication
* Employee communication
* Transition schedule
* Outstanding conditions
* TaxKonnect recommendation

Admin actions:

* Confirm Ready to Close
* Conditions Outstanding
* Delay
* Renegotiate

Transaction may close only after readiness is confirmed.

# 15. FIX EXISTING ISSUES

* Browser title must be:
  “TaxKonnect Accounting Practice Marketplace — Research, Workflow & Interactive Prototype”
* No user-visible CloudTech, AnchorRock, or AnkRok
* Use [maya.chen@taxkonnect.com](mailto:maya.chen@taxkonnect.com)
* Seller timing must be 6–12 months everywhere
* Human-touchpoint count must say ten
* Role selection must open the correct dashboard
* Normal navigation must not alter transaction progress
* No negative-step navigation
* No undefined screens
* No dead buttons

# 16. RESEARCH AND PROCESS MODE

Preserve Research & Process as a separate internal documentation mode.

It may show the full end-to-end transaction map, but the product UX must remain divided into Seller, Buyer, and Admin modules.

Update its wireframe section to clearly present:

* Seller UX
* Buyer UX
* Admin UX
* Shared authentication/public site

Update matching documentation to distinguish matching from ranking.

Update post-diligence documentation to include transaction services and closing readiness.

# 17. FINAL ACCEPTANCE CHECK

Before finishing, verify:

* Seller, Buyer, and Admin are three separate modules
* Each module has its own dashboard, navigation, wireframes, and journey
* There is no single combined user stepper
* Shared deal state still updates across modules
* Public website exists
* Registration exists
* Seller and buyer registration are distinct
* Admin is invitation-only
* Email verification exists
* Sign in exists
* Forgot/reset password exists
* CAPTCHA states exist
* MFA exists
* Account settings exist
* Terms of Use exists
* Privacy Policy exists
* Cookie controls exist
* Accessibility and security pages exist
* Standard error and permission states exist
* Matching is functional
* Ranking is functional
* Matching and ranking remain separate
* Admin prototype inputs recalculate results
* Transaction Services remain intact
* Closing readiness is separate from closing
* Branding is consistently TaxKonnect
* No dead buttons or console errors
* Existing high-quality design language is preserved
