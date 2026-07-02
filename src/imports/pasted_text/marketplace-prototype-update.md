Continue editing the CURRENT CloudTech Brokerage Marketplace project. Do not restart, redesign from scratch, or replace the existing visual system.

The current prototype is a strong foundation. Preserve its navy financial-services styling, existing seller/buyer/staff screens, components, fictional users, 17-step guided flow, approval language, and overall layout.

Your task is to turn the current prototype into the complete final deliverable:

CloudTech Accounting Practice Marketplace — Research, Workflow & Interactive Prototype

Do not stop after fixing only one screen. Complete every requirement below in this same project.

==================================================
1. PRESERVE WHAT ALREADY WORKS
==================================================

Keep:

- Current navy/blue visual system
- Existing desktop app structure
- Seller, buyer, and CloudTech staff role styling
- Elena Martinez, Marcus Lee, Maya Chen
- Listing CT-1042
- $1.2M–$1.4M revenue range
- $2.45M offer
- Existing readiness review
- Existing buyer approval
- Existing access-request review
- Existing seller buyer-approval screen
- Existing document-release screen
- Existing offer and diligence screens
- Existing warnings that NDA does not release files
- Existing distinction between seller approval and document release
- Existing 17-step guided-demo concept

Do not flatten the project into a static presentation. It must remain interactive.

==================================================
2. FIX THE CURRENT NAVIGATION AND STATE ARCHITECTURE
==================================================

The current project incorrectly uses the same currentStep value for both guided-demo progress and normal screen navigation. Separate these concepts.

Create:

- `guidedStep`: always 1–17
- `activeRole`: seller, buyer, or staff
- `activeScreen`: the screen currently being viewed
- Existing completion flags for actual process states

Rules:

- Switching roles must open that role’s dashboard or most relevant current screen.
- Switching to Buyer while the seller-interest screen is open must not leave the seller screen in the center.
- Normal navigation must not automatically complete steps.
- Guided Next Step must complete the current scripted action, update the correct state, switch to the next role when needed, and open the next screen.
- Back may revisit earlier guided screens without undoing completion.
- Reset returns every state to false, guidedStep to 1, role to Seller, and screen to Seller Interest.
- Finishing step 17 must show “17 of 17 steps complete” and “Guided demo complete.”
- Do not allow negative or invalid step values to control the main guided header.
- No navigation action may crash or render an undefined role or step.

Fix every currently dead navigation item:

Seller:
- Dashboard
- Submit Interest
- Business Information
- File Upload
- Readiness Review
- Listing Preview
- Buyer Review
- Deal Progress

Buyer:
- Dashboard
- Create Account
- Purchase Profile
- Marketplace
- Anonymous Listing
- Access Request
- NDA
- Documents
- Submit Offer
- Deal Progress

Staff:
- Staff Dashboard
- Seller Review
- Listing Approval
- Buyer Review
- Matching Shortlist
- Access Request Review
- Document Release
- Deal Progress / Diligence

Every visible navigation item must open a real screen.

==================================================
3. FIX PROCESS GATING
==================================================

Future steps must not be freely accessible through the numbered step dots.

The numbered guided steps should work as follows:

- Completed steps: clickable
- Current step: clickable and highlighted
- Future steps: disabled
- Disabled steps show a tooltip explaining the missing prerequisite

Sidebar screens may be visible in a locked preview state, but users must not be able to perform the action until prerequisites are met.

Use these exact gates:

Listing active only when:
- Seller interest submitted
- Business information saved
- Required files uploaded
- Readiness reviewed
- Seller approved listing
- CloudTech approved listing

Buyer may view the live anonymous listing only when:
- Buyer account created
- Buyer profile submitted
- CloudTech approved buyer
- Listing active

Buyer may submit access request only when:
- Anonymous listing has been opened/viewed
- Buyer approved
- Listing active

Buyer may sign NDA only when:
- Specific access request submitted

CloudTech may review the specific request only when:
- Listing active
- Buyer profile submitted
- Buyer approved
- Access request submitted
- NDA signed

Seller may approve buyer only when:
- CloudTech has reviewed that specific request

CloudTech may release files only when:
- Seller approved buyer access

Buyer may submit offer only when:
- Selected documents released

Diligence opens only when:
- Offer submitted
- Seller accepts offer for diligence

Keep these states completely separate:

- General match recommendation
- Specific access-request review

- Anonymous listing viewed
- Access request submitted

- NDA signed
- Seller buyer approval

- Seller buyer approval
- CloudTech document release

- Offer submitted
- Offer accepted for diligence

==================================================
4. ADD A REAL ANONYMOUS LISTING DETAIL SCREEN
==================================================

The current Marketplace screen goes directly from a listing card to the access-request screen.

Add a separate Anonymous Listing Detail screen within guided step 10.

Flow:

Marketplace list
→ click “View Anonymous Listing”
→ open CT-1042 anonymous detail
→ click “Mark Listing Viewed” or “Continue to Access Request”
→ then proceed to guided step 11

The anonymous listing must show:

- Opportunity CT-1042
- Pacific Northwest Tax and Bookkeeping Practice
- Seattle metro / Pacific Northwest
- $1.2M–$1.4M revenue
- Tax, bookkeeping, advisory
- 9 full-time, 2 seasonal staff
- 6–12 month transition
- High-level practice description
- Strong Fit label
- Plain-language fit reasons

Clearly show what remains hidden:

- Firm name
- Seller name
- Exact address
- Client names
- Employee personal information
- Raw financial documents
- Tax returns
- Banking information
- Sensitive contracts

Viewing this listing must not itself create an access request.

==================================================
5. ADD THE MISSING PRODUCT SCREENS
==================================================

Create these additional fully designed screens using the existing design system.

SELLER DASHBOARD

Show:
- Current stage
- Next action
- Assigned CloudTech contact
- 17-step progress
- Business-information status
- File completeness
- Readiness status
- Listing approval status
- Buyer requests
- Document access
- Offer status
- Diligence status
- Tasks due
- Who is currently responsible

BUYER DASHBOARD

Show:
- Account status
- Profile-review status
- Approved status
- Saved listings
- Recommended listings
- Pending access requests
- NDA status
- Released documents
- Active offers
- Diligence tasks
- Next action

BUYER DOCUMENT AREA

Show both locked and released variants.

Locked variants:
- Seller has not approved access
- Seller approved but CloudTech has not released files

Released variant:
- Detailed business summary
- 2025 P&L summary
- 2026 YTD summary
- Service-revenue summary
- Anonymized client-concentration summary
- View-only label
- Watermark status
- Access expiration
- Released date
- Released by
- Question action
- Offer action

STAFF MATCHING SHORTLIST

Show:
- Buyer
- Required checks
- Strong / Possible / Weak Fit
- Plain-language fit reasons
- Funding status
- Experience
- Timing
- Transition fit
- Conflict status
- Recommend Match
- Hold
- Remove

Display a prominent warning:
“Matching never grants access. A general recommendation is not a deal-specific access-request review.”

ROLE-SPECIFIC DEAL-PROGRESS SCREENS

Create appropriate seller, buyer, and staff variants rather than sending every role to one generic screen.

==================================================
6. ADD A SECOND TOP-LEVEL MODE: RESEARCH & PROCESS
==================================================

The final project must have two primary top-level modes:

1. Research & Process
2. Interactive Prototype

Add a permanent top-level switch in the header.

The Interactive Prototype is the existing app.

The Research & Process mode should be a polished long-scroll internal strategy document with:

- Sticky left navigation
- White content cards
- Tables
- Process diagrams
- Callouts
- Wireframe cards
- Print / Export button
- Same visual system as the product

Use this left navigation:

1. What We Actually Tested
2. Marketplace Lessons
3. Recommended CloudTech Model
4. Seller Listing Entry
5. Buyer Process
6. Seller Process
7. Human CloudTech Touchpoints
8. Seller Readiness
9. Documents and Access
10. Buyer-Seller Matching
11. Full End-to-End Process
12. Information Requirements
13. Initial Wireframes
14. Open Decisions
15. Sources and Evidence

==================================================
7. RESEARCH SECTION: WHAT WE ACTUALLY TESTED
==================================================

Create a research-status table for:

- BizBuySell
- Accounting Practice Sales
- Acquire.com
- Flippa
- Poe Group Advisors
- Axial

Use honest evidence labels.

BizBuySell:
- Viewed signup flow
- Private account not reached
- Observed name, email, phone, password, newsletter, and Buy / Sell / Just Browsing role choice

Accounting Practice Sales:
- Viewed signup flow
- Private account not reached
- Observed first name, last name, email, phone, state/province, and buyer-or-seller choice

Acquire.com:
- Public flow reviewed
- Private dashboard unconfirmed
- Publicly documented account, verification, criteria, NDA, request, seller approval, data room, LOI, diligence

Flippa:
- Viewed signup flow
- Private account not reached
- Observed email, password, Google signup

Poe Group Advisors:
- Public flow reviewed
- Private dashboard unconfirmed
- Public buyer registration, confidentiality agreement, seller permission, broker-led process

Axial:
- Public flow reviewed
- Private dashboard unconfirmed
- Public or visible membership fields for role, company, size, experience, capital, criteria

Prominently state:

“Private account testing remains incomplete. No credentials, verification steps, paid plans, real inquiries, or transaction-specific actions were submitted.”

Never claim a private dashboard was inspected.

==================================================
8. MARKETPLACE LESSONS
==================================================

Create a comparison table with:

- Marketplace
- Model
- What was observed
- What CloudTech should copy
- What CloudTech should not copy
- What remains unknown

Main conclusions:

Accounting Practice Sales:
- Copy accounting-specific language and human brokerage support
- Do not copy opaque email-only status management

Poe:
- Copy seller permission and transition support
- Do not rely on staff memory to manage document access

BizBuySell:
- Copy low-friction signup and anonymous browsing
- Do not leave buyer qualification and file controls decentralized

Axial:
- Copy private shortlists and explainable matching
- Do not import unnecessary large-deal complexity

Acquire.com:
- Copy the clear order of anonymous listing → request → NDA → seller approval → selected files → offer → diligence
- Do not copy SaaS-only or paid-gate assumptions

Flippa:
- Copy simple signup and visible verification status
- Do not copy auction mechanics

Feature this conclusion:

“The recommended CloudTech model combines accounting-specific brokerage support, anonymous discovery, qualified buyers, seller-controlled access, controlled documents, and a visible transaction workflow.”

==================================================
9. HUMAN CLOUDTECH TOUCHPOINTS
==================================================

This must be a dedicated, highly visible section, not scattered text.

Create a full table plus a visual journey map.

Columns:
- Human touchpoint
- Owner
- What the CloudTech person does
- What the user sees afterward
- System support
- Decision

Include these nine touchpoints in full:

1. First Seller Call
Owner: Assigned CloudTech lead
Human work:
- Learn goals
- Confirm ownership and authority
- Understand timing
- Understand confidentiality concerns
- Discuss desired transition
- Explain process
User sees:
- Assigned contact
- Written next step
- Initial request list
Decision:
- Continue, pause, refer, stop

2. Information and File Help
Owner: Deal lead or analyst
Human work:
- Explain required information
- Review uploads
- Identify missing items
- Request replacements
- Track versions
User sees:
- Missing-item list
- File-review status
- Deadline
Decision:
- Complete, more required, pause

3. Financial-Record Review
Owner: Analyst with deal lead
Human work:
- Check dates and periods
- Reconcile totals
- Compare tax records
- Review owner adjustments
- Challenge unsupported claims
User sees:
- Questions
- Required corrections
- Accepted explanations
Decision:
- Clear, Needs Work, Major Concern

4. Readiness and Price Discussion
Owner: Deal lead
Human work:
- Explain strengths
- Explain risks
- Discuss likely buyer reaction
- Discuss seller expectations
- Discuss timing and transition
User sees:
- List now, fix first, pause, stop
Decision:
- Go to market, prepare further, pause, not a fit

5. Listing Writing
Owner: Deal lead
Human work:
- Write anonymous teaser
- Write private profile
- Remove identifying information
- Define staged visibility
- Prepare proposed release package
User sees:
- Listing preview
- Anonymous/private comparison
Decision:
- Approve, edit, pause

6. Buyer Check
Owner: Assigned CloudTech staff
Human work:
- Review identity
- Review organization and role
- Review criteria
- Review funding
- Review experience
- Check conflicts
User sees:
- Approved, restricted, more information required, rejected
Seller later sees:
- Reviewed summary only, never raw proof of funds

7. Match and Specific Access-Request Review
Owner: Deal lead
Human work:
- Review general fit separately
- Later review the specific request only after request + NDA
- Check fit, conflicts, reason for interest, and release package
Seller sees:
- Fit label
- Plain reasons
- Buyer note
- CloudTech recommendation
Decision:
- Recommend, hold, ask for more, decline, send to seller

8. Calls, Questions, and Offer Support
Owner: Deal lead
Human work:
- Prepare meetings
- Organize questions
- Route answers
- Normalize offer terms
- Help seller compare structure and conditions
User sees:
- Meeting notes
- Open questions
- Offer comparison
Decision:
- Continue, counter, revise, reject, accept for diligence

9. Diligence, Closing, and Transition
Owner: Deal lead with legal/finance support
Human work:
- Track requests
- Assign owners
- Coordinate releases
- Monitor deadlines
- Support legal and financial review
- Coordinate closing and transition
User sees:
- Diligence task list
- Due dates
- Released-document status
- Closing checklist
- Transition checklist
Decision:
- Continue, renegotiate, pause, end, close

Use separate icons for:
- Seller action
- Buyer action
- CloudTech human action
- Automated system update
- Approval gate
- File release

==================================================
10. SELLER READINESS, DOCUMENTS, MATCHING, AND PROCESS
==================================================

Add complete Research & Process sections for:

SELLER READINESS
Use only:
- Clear
- Needs Work
- Major Concern

Areas:
- Financial records
- Revenue trend
- Profit quality
- Client concentration
- Owner dependence
- Employee dependence
- Business processes
- Legal/business records
- Price/timing/transition
- Buyer demand

DOCUMENT ACCESS STAGES
Show:
- Anonymous listing
- Approved buyer
- Request + NDA
- Seller-approved access
- Serious review
- Accepted offer / diligence

For each stage show:
- Information visible
- Files visible
- Who can see it
- Who approves
- File rule

MATCHING
Use:
- Strong Fit
- Possible Fit
- Weak Fit

No hidden percentage and no machine-learning language.

FULL 17-STEP PROCESS
Show all 17 steps with:
- Role
- Action
- Resulting state
- Human involvement
- Prerequisite
- Next allowed action

INFORMATION REQUIREMENTS
Create a readable business table covering:
- Buyer account
- Buyer organization
- Buyer criteria
- Buyer funding
- Buyer experience
- Seller account
- Seller ownership
- Seller business details
- Seller financials
- Seller clients
- Seller employees
- Seller transition
- Listing
- Document
- Match
- Access request
- NDA
- Seller access decision
- Meeting
- Question
- Offer
- Diligence request
- Deal stage
- Closing task
- Transition task

==================================================
11. INITIAL WIREFRAMES
==================================================

Add a section containing labeled low-fidelity wireframe cards for:

Seller:
- Interest
- Dashboard
- Business Information
- File Upload
- Readiness
- Listing Preview
- Buyer Review
- Deal Progress

Buyer:
- Signup
- Dashboard
- Purchase Profile
- Marketplace
- Anonymous Listing
- Access Request
- NDA
- Documents
- Offer
- Deal Progress

Staff:
- Dashboard
- Seller Review
- Listing Approval
- Buyer Review
- Matching
- Specific Request Review
- Document Release
- Diligence

Each wireframe card must state:
- Purpose
- Information shown
- Primary actions
- What happens next

==================================================
12. CONTENT AND DATE CORRECTIONS
==================================================

The project date is June 30, 2026.

Correct every 2025 date to a coherent 2026 timeline.

Use:

- Project / research date: June 30, 2026
- Buyer request and NDA: July 1, 2026
- Seller approval and document release: early July 2026
- Diligence tasks: July 2026
- Target close: September 30, 2026

There must be no 2025 date anywhere.

Correct the seller’s intended timing to:
- 6–12 months

Use that consistently across:
- Interest form
- Listing
- Buyer fit
- Offer
- Transition

Do not invent or assert CloudTech’s legal entity name in the NDA.

Label the NDA:
“Sample confidentiality agreement for prototype purposes — not legal advice.”

==================================================
13. VISUAL AND RESPONSIVE REQUIREMENTS
==================================================

Preserve the existing desktop visual style.

Improve:

- Clearer card hierarchy
- Consistent button widths
- More visible locked-state explanations
- More consistent status badges
- Better empty states
- Better hover and focus states
- Strong text contrast
- No tiny critical copy
- No horizontal clipping

Create responsive behavior for:
- 1440 desktop
- 1024 tablet
- 390 mobile

On mobile:
- Sidebar becomes a drawer
- Forms stack vertically
- Tables become cards when necessary
- Primary action remains easy to reach
- Step progress remains readable
- No content is cut off

==================================================
14. FINAL ACCEPTANCE TEST
==================================================

Before finishing, test all of the following:

- Research & Process opens
- Interactive Prototype opens
- Every left-nav item works
- Every role tab opens the correct role experience
- Seller Dashboard works
- Buyer Dashboard works
- Staff Dashboard works without crashing
- Staff Matching works
- Buyer Documents works
- All three Deal Progress views work
- Anonymous listing is separate from marketplace
- Anonymous listing view is separate from access request
- NDA is separate from document release
- General matching is separate from specific-request review
- Seller approval is separate from CloudTech release
- Future guided steps cannot be skipped
- Locked actions explain the prerequisite
- Guided flow reaches 17 of 17
- Reset returns to 0 of 17
- No dead buttons
- No undefined screens
- No console errors
- No 2025 dates
- All nine human touchpoints are fully written out
- Existing high-quality screens are preserved
- The complete project is credible enough to present to Amit as the research, process, wireframes, and working marketplace prototype