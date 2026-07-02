You are a senior product designer, UX systems architect, and financial-services workflow specialist.

Create a complete Figma project from scratch for a product called:

# CloudTech Brokerage Marketplace

This is a broker-led digital marketplace for buying and selling accounting and tax practices.

The project must include:

1. Research and process documentation
2. End-to-end buyer, seller, and CloudTech staff workflows
3. Explicit human CloudTech touchpoints
4. Information and document requirements
5. Access-control and approval logic
6. Low-fidelity wireframes
7. A polished high-fidelity product design
8. A clickable guided prototype
9. Design-system components
10. Clear developer-handoff annotations

Do not create a generic SaaS dashboard, startup pitch deck, landing page, or superficial set of screens.

Create a serious, operational product design that demonstrates exactly how the brokerage marketplace would work.

---

# 1. PRODUCT CONCEPT

CloudTech is creating a marketplace for accounting-practice and tax-practice transactions.

The product combines:

* A high-touch brokerage service
* Seller onboarding and readiness preparation
* Anonymous marketplace listings
* Buyer onboarding and qualification
* Buyer-seller matching
* Seller-controlled access
* NDA tracking
* Controlled document release
* Offer management
* Due-diligence management
* Human CloudTech support throughout the process

The product must feel like:

* A credible private-market transaction platform
* A modern but conservative financial-services product
* A workflow tool used by real buyers, sellers, analysts, and deal leads
* Human-led rather than fully automated
* Secure, controlled, and transparent

Do not make it feel like:

* A social network
* A public classified-ads website
* A crypto marketplace
* An auction platform
* A generic CRM
* A consumer fintech app
* A flashy AI startup
* An automated matching engine that removes human judgment

---

# 2. CORE PRODUCT PRINCIPLES

These rules are non-negotiable and must be visible throughout the design.

## Human-led, system-assisted

CloudTech staff own the relationship and exercise judgment.

The software helps manage:

* Status
* Missing information
* Tasks
* Buyer profiles
* Seller profiles
* Files
* Permissions
* NDA status
* Buyer requests
* Match recommendations
* Offers
* Due-diligence requests
* Deal stages

The software does not replace:

* Seller conversations
* Readiness discussions
* Buyer evaluation
* Seller decision-making
* Offer guidance
* Diligence coordination
* Transition support

## Seller controls private access

The seller ultimately decides which buyer receives private information.

CloudTech may review and recommend a buyer, but CloudTech cannot replace the seller’s decision.

## Anonymous discovery comes first

A buyer initially sees an anonymous listing.

The buyer must not initially see:

* Seller name
* Firm name
* Exact address
* Client names
* Employee personal information
* Raw financial documents
* Tax returns
* Banking information
* Sensitive contracts

## NDA does not unlock documents

Signing an NDA only makes an access request eligible for review.

The NDA itself must never automatically release private files.

## General matching is separate from deal-specific review

A general match recommendation means CloudTech believes a buyer may fit a listing.

It does not mean:

* The buyer requested the deal
* The buyer signed an NDA
* CloudTech reviewed a specific access request
* The seller approved the buyer
* Documents were released

These must remain separate states.

## Seller approval and document release are separate

Seller approval allows CloudTech to release an approved package.

Seller approval must not itself automatically release documents.

A separate CloudTech document-release action is required.

## Each transaction stage must have a clear gate

A user must not be able to skip ahead and create an impossible transaction state.

---

# 3. TARGET USERS

Create distinct experiences for three primary roles.

## Seller

Example fictional user:

* Elena Martinez
* Owner of Martinez Tax & Advisory LLC
* Planning retirement
* Wants staff and client relationships protected
* Concerned about confidentiality
* Willing to support a 6–12 month transition

Seller goals:

* Understand the process
* Know what CloudTech needs
* Upload documents
* See missing items
* Review readiness
* Approve the listing
* Review qualified buyers
* Control access
* Review offers
* Manage diligence
* Track the sale

## Buyer

Example fictional user:

* Marcus Lee
* Head of Acquisitions
* Evergreen Accounting Partners
* Seeking accounting firms in Washington and Oregon
* Has prior accounting-practice acquisition experience
* Uses cash and bank debt
* Wants firms with stable staff and recurring client relationships

Buyer goals:

* Create an account
* Build a purchase profile
* Prove credibility and funding readiness
* View anonymous opportunities
* Understand why a deal may fit
* Request access
* Sign an NDA
* Receive seller-approved information
* Ask questions
* Submit an offer
* Complete diligence

## CloudTech staff

Example fictional user:

* Maya Chen
* CloudTech deal lead
* Responsible for seller readiness, buyer checks, matching, access requests, document release, offers, and diligence

CloudTech staff goals:

* Manage seller inquiries
* Assign owners
* Check seller authority
* Review seller information
* Track missing documents
* Assess seller readiness
* Prepare listings
* Approve listings
* Review buyers
* Recommend matches
* Review deal-specific access requests
* Present buyers to sellers
* Release selected documents
* Coordinate offers
* Track diligence
* Maintain a clear transaction history

---

# 4. FIGMA FILE STRUCTURE

Create the Figma file with the following top-level pages.

## Page 00 — Cover and Project Overview

Include:

* Product name
* One-sentence explanation
* Product principles
* Three primary user roles
* A simple visual showing:

Seller preparation → Anonymous listing → Qualified buyer → Seller-approved access → Offer → Diligence

Include two large prototype entry buttons:

* Start Research and Process
* Start Guided Product Prototype

## Page 01 — Research and Process

Create a polished, presentation-quality long-scroll desktop experience.

This should look like a real internal product strategy and workflow document, not a slide deck.

Use a sticky left navigation and main content area.

## Page 02 — User and Process Flows

Include:

* Seller flow
* Buyer flow
* CloudTech staff flow
* Full 17-step transaction flow
* Human touchpoint map
* Document-access flow
* Match-versus-access-request distinction
* Approval-gate diagrams

## Page 03 — Low-Fidelity Wireframes

Include all required low-fidelity wireframes.

Use simple grayscale boxes, labels, tables, controls, and buttons.

## Page 04 — Design System

Include:

* Color styles
* Typography
* Spacing
* Grid
* Icons
* Buttons
* Inputs
* Selects
* Text areas
* Tables
* Status badges
* Alert banners
* Cards
* Progress indicators
* Side navigation
* Top navigation
* File rows
* Listing cards
* Buyer cards
* Readiness labels
* Task rows
* Timeline components
* Empty states
* Locked states
* Modals
* Toasts
* Tooltips

Use component variants and Auto Layout.

## Page 05 — High-Fidelity Product Screens

Create all seller, buyer, and staff screens.

## Page 06 — Guided Prototype

Create the full clickable 17-step walkthrough with realistic transitions and state changes.

## Page 07 — Handoff and Logic Notes

Include:

* Screen inventory
* Component inventory
* State definitions
* Gate logic
* User-role permissions
* File-access rules
* Open legal and business decisions
* Notes for engineering

---

# 5. VISUAL STYLE

Use a professional private-markets and financial-services visual style.

The design should feel:

* Trustworthy
* Calm
* Clear
* Operational
* Human
* Mature
* Modern
* Secure
* High-touch

Avoid:

* Excessive gradients
* Neon colors
* Glassmorphism
* Cartoon illustrations
* Giant marketing typography
* Excessive whitespace
* Crypto-style visuals
* Overly futuristic AI visuals
* Decorative charts that do not serve the workflow

## Color palette

Use these primary colors:

* Navy: #17365D
* Dark navy header: #102945
* Blue: #2F6F9F
* Pale blue: #EEF5FA
* Main text: #202A33
* Muted text: #66727D
* Border: #D7E0E8
* Background: #F4F7F9
* White: #FFFFFF

Status colors:

* Positive background: #E6F4DF
* Positive text: dark green
* Warning background: #FFF4CC
* Warning text: dark amber
* Risk background: #FBE1E1
* Risk text: dark red
* Informational blue background: #E2EFF9

## Typography

Use Inter or a similarly clean professional sans-serif.

Suggested scale:

* Page title: 32–36 px
* Product-screen title: 24–28 px
* Section heading: 20–24 px
* Card heading: 14–16 px
* Body: 14 px
* Table: 11–12 px
* Labels and metadata: 10–12 px

Use readable line heights and strong hierarchy.

## Layout

Primary desktop frame:

* 1440 px width
* 8-point spacing system
* Main app sidebar approximately 260–280 px
* Main content maximum width approximately 1100–1200 px
* 12-column grid for dashboards
* Cards with 10–12 px radius
* Subtle shadows only
* Thin neutral borders

Create responsive examples for:

* 390 px mobile seller dashboard
* 390 px mobile buyer marketplace
* 390 px mobile access request
* 390 px mobile CloudTech dashboard
* 390 px mobile deal progress

Desktop remains the primary deliverable.

---

# 6. RESEARCH AND PROCESS EXPERIENCE

Create a global sticky header with:

* CloudTech Brokerage Marketplace
* Research and Process tab
* Clickable Prototype tab
* Print or Export button

The Research and Process experience must include a sticky left navigation with these entries:

1. What We Tested
2. Marketplace Lessons
3. Recommended CloudTech Model
4. Seller Listing Entry
5. Buyer Process
6. Seller Process
7. Human Touchpoints
8. Seller Readiness
9. Documents and Access
10. Buyer-Seller Matching
11. Full End-to-End Process
12. Initial Wireframes
13. Open Decisions
14. Sources and Evidence

Use cards, tables, process strips, callouts, and diagrams.

---

# 7. SECTION 1 — WHAT WAS TESTED

Create a clear research-status table covering:

## BizBuySell

Model:

* Self-serve business-listing marketplace

Status:

* Viewed only — private account not reached

Observed:

* Full name
* Email
* Phone
* Password
* Newsletter choice
* Post-account role selection:

  * Buy a business
  * Sell a business
  * Just browsing

Unknown:

* Private dashboard
* Saved listings
* Saved searches
* Inquiries
* Account settings
* Free-versus-paid functionality

## Accounting Practice Sales

Model:

* Broker-led accounting-practice marketplace

Status:

* Viewed only — private account not reached

Observed:

* First name
* Last name
* Email
* Mobile phone
* State or province of interest
* Buyer-or-seller role choice

Unknown:

* Private dashboard
* Notifications
* Buyer-request workflow
* Internal qualification
* File permissions

## Acquire.com

Model:

* Guided online acquisition marketplace

Status:

* Public flow reviewed — private dashboard unconfirmed

Observed publicly:

* Email and password
* Email verification
* Buyer or seller role
* Buyer acquisition criteria
* Identity and funds requests
* Anonymous listings
* Access requests
* NDA
* Seller approval
* Data room
* Letter of intent
* Due diligence

Unknown:

* Exact current private screens
* Paid and free boundaries
* Verification handling
* Account-only features

## Flippa

Model:

* Digital-asset marketplace

Status:

* Viewed only — private account not reached

Observed:

* Email
* Password
* Google signup

Unknown:

* Private dashboard
* Messaging
* Buyer checks
* Seller listing process
* ID verification sequence
* Payment and bidding controls

## Poe Group Advisors

Model:

* Broker-led accounting-practice marketplace

Status:

* Public flow reviewed — private dashboard unconfirmed

Observed:

* Buyer registration
* Listing notifications
* Confidentiality agreement
* Seller permission before confidential profile
* Broker-led process

Unknown:

* Private buyer tools
* Internal buyer checks
* Exact document-release process
* Portal functionality

## Axial

Model:

* Private buyer and advisor network

Status:

* Public flow reviewed — private dashboard unconfirmed

Observed:

* Role
* Company type
* Company size
* Deal experience
* Capital
* Accreditation-related questions
* Criteria-based matching
* Seller or advisor control

Unknown:

* Private member workflow
* Internal screening
* Deal access
* Messaging
* File release

Display a prominent disclosure:

“Private account testing remains incomplete. No credentials, verification steps, paid plans, real inquiries, or transaction-specific actions were submitted.”

Do not claim that a private dashboard was observed.

---

# 8. SECTION 2 — MARKETPLACE LESSONS

Create a comparison table with columns:

* Marketplace
* Operating model
* What was observed
* What CloudTech should copy
* What CloudTech should not copy
* What remains unknown

Use the following strategic conclusions.

## Accounting Practice Sales

Copy:

* Accounting-specific wording
* Short initial account entry
* Human help through offer and transition
* Valuation discussion as a potential seller entry point

Do not copy:

* Opaque email-only workflows
* Unclear status
* No central access record

## Poe Group Advisors

Copy:

* Seller permission
* Early human contact
* High-level review before detailed verification
* Strong transition support

Do not copy:

* Reliance on email and staff memory for file access

## BizBuySell

Copy:

* Low-friction signup
* Anonymous discovery
* Saved listings
* Saved searches
* Educational content

Do not copy:

* Weak central control over buyer quality and sensitive files

## Axial

Copy:

* Private shortlist
* Criteria-based matching
* Human review
* Explainable fit reasons
* Pursuit rate as a possible later metric

Do not copy:

* Unnecessary large-deal complexity
* Accreditation assumptions
* Overbuilt membership process

## Acquire.com

Copy:

* Clear transaction stages
* Anonymous listing
* Access request
* NDA
* Seller approval
* Selected files
* Offer
* Due diligence

Do not copy:

* SaaS-only fields
* Automatic trust badges as a substitute for staff judgment
* Paid gates that do not fit the first CloudTech pilot

## Flippa

Copy:

* Simple signup
* Visible verification status

Do not copy:

* Auction mechanics
* Digital-asset transfer logic
* Buyer bidding culture

Present the main conclusion prominently:

“The best CloudTech model is not a copy of one marketplace. It combines accounting-specific brokerage support with anonymous discovery, qualified buyer profiles, seller-controlled access, controlled documents, and a visible transaction workflow.”

---

# 9. SECTION 3 — RECOMMENDED CLOUDTECH MODEL

Create an eight-step visual process strip.

## Step 1 — Short seller start

A short initial form followed by a real CloudTech conversation.

## Step 2 — Prepare and check

Seller enters business information and uploads files.

CloudTech identifies:

* Missing information
* Readiness gaps
* Ownership issues
* Confidentiality concerns
* Transition needs

## Step 3 — Anonymous listing

CloudTech drafts an anonymous listing.

Seller approves the wording.

CloudTech approves launch.

## Step 4 — Buyer account and purchase profile

Buyer creates a basic account first.

Buyer later completes:

* Criteria
* Funding
* Experience
* Organization
* Timing
* Transition preferences

## Step 5 — Deal-specific access

Buyer views an anonymous listing.

Buyer requests access to that specific listing.

Buyer signs the NDA.

## Step 6 — Two human checks

CloudTech reviews the specific request.

The seller then decides whether the buyer should receive access.

## Step 7 — Selected document release

CloudTech releases only the package authorized for that buyer.

## Step 8 — Offer and diligence

Buyer submits an offer.

Seller may accept the offer for diligence.

Deeper documents are then released through a controlled diligence process.

Beside this process, create two cards:

## What stays human

* First seller call
* Ownership and goal discussion
* Seller-readiness discussion
* Price and market-expectation discussion
* Buyer checks
* Fit review
* Seller buyer-comparison support
* Calls
* Questions
* Offers
* Diligence
* Closing
* Transition support

## What the software handles

* Status
* Tasks
* Missing information
* File versions
* Buyer profiles
* Seller profiles
* Listing status
* NDA status
* Access requests
* Permissions
* Document-release history
* Offer status
* Due-diligence tasks
* Deal-stage history

---

# 10. SECTION 4 — SELLER LISTING ENTRY

Create a detailed 12-step seller-listing process.

For each step, show:

* Information needed
* Seller action
* CloudTech action
* Decision or result
* Human touchpoint
* System status

## Step 1 — Short interest form

Collect:

* Name
* Email
* Phone
* Rough location
* Rough business size
* Main services
* Intended timing
* Reason for selling

Result:

* New seller inquiry
* Assigned CloudTech contact

## Step 2 — First seller call

Discuss:

* Seller goals
* Ownership
* Sale authority
* Timing
* Confidentiality concerns
* Desired transition
* Buyer preferences

Result options:

* Continue
* Pause
* Refer elsewhere
* Not a fit
* Optional valuation discussion

## Step 3 — Ownership and authority check

Collect:

* Legal entity
* Owners
* Ownership percentages
* Authority to sell
* Other required decision-makers

Result:

* Clear
* Needs another owner
* Needs documentation
* Stop

## Step 4 — Business information

Collect:

* Locations
* Services
* Employees
* Licenses
* Systems
* Owner responsibilities
* Client-service model
* Operating structure

## Step 5 — Financial and file upload

Collect:

* Profit-and-loss statements
* Tax returns
* Current-year financials
* Revenue by service
* Client concentration
* Employee information
* Contracts
* Lease information
* Owner compensation and adjustments

## Step 6 — Missing-information review

CloudTech identifies:

* Missing periods
* Inconsistent totals
* Unsupported adjustments
* Missing contracts
* Missing ownership documents
* Unclear client or employee information

## Step 7 — Readiness review

Use:

* Clear
* Needs Work
* Major Concern

Do not use a numeric score.

## Step 8 — Price, market, and buyer discussion

Discuss:

* Seller expectations
* Likely buyer reaction
* Buyer types
* Timeline
* Deal terms
* Transition
* Risks
* Potential positioning

## Step 9 — Draft listing

Create:

* Anonymous listing
* Detailed private profile
* Proposed document package
* Disclosure plan

## Step 10 — Seller listing approval

Seller may:

* Approve
* Request edits
* Pause
* Withdraw

## Step 11 — CloudTech final listing approval

Check:

* Required information
* Files
* Readiness
* Seller approval
* Access rules
* Assigned team
* Listing language

## Step 12 — Update, pause, remove, or sell

Allow:

* Listing updates
* New financial periods
* Status changes
* Pause
* Removal
* Sold status
* Access termination

Display a prominent activation gate:

A listing becomes active only when all of these are complete:

* Seller interest submitted
* Business information saved
* Required files uploaded
* Readiness reviewed
* Seller listing approved
* CloudTech listing approved

---

# 11. SECTION 5 — BUYER PROCESS

Create a clear buyer-stage table.

## Stage 1 — Basic buyer account

Collect:

* Name
* Email
* Phone
* Password
* Buyer type
* Organization
* Role
* Website

## Stage 2 — Purchase profile

Collect:

* Target location
* Target services
* Target revenue
* Target profit
* Deal-size range
* Timing
* Desired ownership structure
* Transition preferences

## Stage 3 — Funding and financing

Collect:

* Available equity
* Financing plan
* Lender status
* Proof document
* Conditions
* Funding range

Raw proof-of-funds documents must remain restricted to assigned CloudTech staff.

The seller sees only a summarized reviewed status.

## Stage 4 — Experience and checks

Collect:

* Prior acquisitions
* Accounting experience
* Tax experience
* Operating experience
* Relevant references
* Identity and company information
* Conflict information

## Stage 5 — Buyer approval

CloudTech may:

* Approve
* Restrict
* Ask for more
* Reject

## Stage 6 — Anonymous listing view

Buyer sees:

* Broad location
* Revenue range
* Service mix
* Staffing range
* General transition
* Fit explanation

## Stage 7 — Deal-specific access request

Buyer provides:

* Reason for interest
* Financing summary
* Relevant experience
* Requested information

## Stage 8 — NDA

Record:

* Listing
* Buyer
* Signer
* Signer capacity
* NDA version
* Signed date
* Status

The NDA does not release documents.

## Stage 9 — CloudTech request review

Review:

* Active listing
* Complete buyer profile
* Buyer approval
* Access request
* NDA
* Fit
* Conflict
* Reason for interest
* Proposed release package

## Stage 10 — Seller decision

Seller may:

* Approve
* Reject
* Delay
* Ask for more

## Stage 11 — Selected document access

Buyer receives only seller-approved and CloudTech-released files.

## Stage 12 — Offer

Collect:

* Purchase price
* Cash at close
* Debt
* Seller note
* Earnout
* Conditions
* Target close
* Transition
* Diligence requirements

## Stage 13 — Diligence

Track:

* Requests
* Owners
* Due dates
* Status
* Release decisions
* File history
* Open questions

---

# 12. SECTION 6 — SELLER PORTAL NEEDS

Create eight prominent feature cards.

## Current stage and next step

Seller always knows:

* Current stage
* Current owner
* Next required action
* Who is waiting on whom

## Firm information

Seller can enter and update:

* Ownership
* Services
* Locations
* People
* Systems
* Clients
* Transition information

## Files

Seller can:

* Upload
* Replace
* Review version
* See date
* See missing status
* See CloudTech review status

## Readiness

Seller sees:

* Clear
* Needs Work
* Major Concern
* Required actions
* CloudTech notes

## Listing preview

Seller sees:

* Anonymous listing
* Private profile
* What is visible at each stage
* What remains hidden

## Buyer review

Seller sees:

* Buyer identity
* Buyer organization
* Buyer type
* Funding status
* Experience
* Fit reasons
* Interest note
* NDA status
* CloudTech recommendation

## Access control

Seller may:

* Approve
* Reject
* Delay
* Ask for more
* View existing access
* Request access removal

## Deal tracking

Seller sees:

* Meetings
* Questions
* Offers
* Diligence
* Documents
* Deadlines
* Closing
* Transition

---

# 13. SECTION 7 — HUMAN CLOUDTECH TOUCHPOINTS

This section must be highly visible and detailed.

Do not bury it in small annotations.

Create a full-width visual table and an accompanying journey map.

Use columns:

* Human touchpoint
* Owner
* What the CloudTech person does
* What the user sees afterward
* System support
* Main decision

Include these exact nine touchpoints.

## 1. First seller call

Owner:

* Assigned CloudTech lead

CloudTech work:

* Learn seller goals
* Confirm ownership
* Understand timing
* Understand confidentiality concerns
* Learn desired transition
* Explain how the process works
* Determine whether the opportunity appears suitable

User sees afterward:

* Assigned CloudTech contact
* Written next step
* Initial information request
* Scheduled follow-up

System support:

* Inquiry record
* Assigned owner
* Call notes
* Next task
* Fit status

Decision:

* Continue
* Pause
* Refer
* Stop

## 2. Information and file help

Owner:

* Assigned CloudTech lead or analyst

CloudTech work:

* Give the seller a short request list
* Explain unfamiliar information
* Review uploaded items
* Follow up on missing items
* Request replacement files
* Track versions

User sees afterward:

* Missing-item list
* File-review status
* Plain explanation of what remains
* Next deadline

System support:

* File checklist
* Upload area
* Version history
* Review status
* Task reminders

Decision:

* Complete
* More information required
* Pause

## 3. Financial-record review

Owner:

* Analyst with deal lead

CloudTech work:

* Check dates
* Compare financial periods
* Compare totals
* Compare tax records
* Review owner adjustments
* Identify inconsistent claims
* Ask the seller for explanations

User sees afterward:

* Clear questions
* Corrections required
* Accepted explanations
* Unsupported claims removed

System support:

* Financial-file folders
* Review notes
* Status labels
* Reconciliation tasks

Decision:

* Clear
* Needs Work
* Major Concern

## 4. Readiness and price discussion

Owner:

* Deal lead

CloudTech work:

* Explain strengths
* Explain risks
* Explain likely buyer questions
* Discuss market demand
* Discuss seller expectations
* Discuss timing
* Discuss transition
* Explain whether the practice should list now

User sees afterward:

* List now
* Fix first
* Pause
* Stop
* Agreed next actions

System support:

* Readiness summary
* Risk labels
* Action list
* Decision record

Decision:

* Go to market
* Prepare further
* Pause
* Not a fit

## 5. Listing writing

Owner:

* Deal lead

CloudTech work:

* Create anonymous teaser
* Create private profile
* Use seller-approved facts
* Remove identifying information from the anonymous version
* Define what is shared at each access stage
* Prepare the proposed document package

User sees afterward:

* Listing preview
* Anonymous versus private comparison
* Approval controls
* Edit-request option

System support:

* Listing editor
* Preview
* Visibility labels
* Approval history

Decision:

* Approve
* Edit
* Pause

## 6. Buyer check

Owner:

* Assigned CloudTech staff

CloudTech work:

* Review buyer contact information
* Review organization
* Review buyer role
* Review acquisition criteria
* Review funding status
* Review relevant experience
* Check conflicts
* Request more information when needed

User sees afterward:

Buyer sees:

* Approved
* Restricted
* More information required
* Rejected

Seller later sees:

* Buyer summary
* Reviewed funding status
* Relevant experience
* Buyer type
* Organization
* No raw proof documents

System support:

* Buyer profile
* Review checklist
* Funding status
* Approval status
* Internal notes

Decision:

* Approve
* Restrict
* Ask for more
* Reject

## 7. Fit and access-request review

Owner:

* Deal lead

CloudTech work:

First, review general fit:

* Location
* Size
* Services
* Funding
* Experience
* Timing
* Transition
* Buyer type
* Conflicts

Later, separately review each deal-specific request after:

* Buyer viewed the listing
* Buyer requested access
* Buyer signed the NDA

User sees afterward:

Seller sees:

* Strong fit
* Possible fit
* Weak fit
* Plain-language reasons
* Buyer interest note
* CloudTech recommendation

Buyer sees:

* Under review
* More information required
* Declined
* Sent to seller
* Approved

System support:

* Match shortlist
* Fit reasons
* Request record
* NDA status
* Staff recommendation
* Seller-decision controls

Decision:

* Recommend
* Hold
* Ask for more
* Decline
* Send to seller

## 8. Calls, questions, and offers

Owner:

* Deal lead

CloudTech work:

* Prepare both parties for meetings
* Organize buyer questions
* Route seller responses
* Track open questions
* Coordinate calls
* Receive offers
* Normalize offer terms
* Help the seller compare structure, timing, and conditions

User sees afterward:

* Meeting notes
* Open questions
* Next steps
* Offer comparison
* Clarification requests

System support:

* Meeting record
* Question tracker
* Offer cards
* Offer-comparison table
* Task assignments

Decision:

* Continue
* Request revision
* Counter
* Reject
* Accept for diligence

## 9. Diligence and closing

Owner:

* Deal lead with legal and finance support

CloudTech work:

* Track diligence requests
* Determine who owns each task
* Coordinate file release
* Monitor deadlines
* Track unresolved issues
* Support legal and financial review
* Coordinate closing steps
* Track transition obligations

User sees afterward:

* Visible diligence task list
* Current deal stage
* Due dates
* Missing items
* Released-document status
* Closing checklist
* Transition checklist

System support:

* Diligence room
* Task list
* File permissions
* Deadline tracking
* Activity history
* Deal-stage timeline

Decision:

* Continue
* Renegotiate
* Pause
* End deal
* Close

Also create a visual journey showing where the software supports the process and where a human CloudTech employee actively intervenes.

Use distinct icons for:

* Seller action
* Buyer action
* CloudTech human action
* Automated system status
* Approval gate
* File release

---

# 14. SECTION 8 — SELLER-READINESS REVIEW

Create a detailed readiness matrix.

Do not use numeric scores or percentages.

Use three statuses:

* Clear
* Needs Work
* Major Concern

Include these areas:

## Financial records

Clear:

* Current
* Complete
* Consistent with tax records
* Explanations support differences

Needs Work:

* Missing periods
* Inconsistent totals
* Unsupported adjustments

Major Concern:

* Records cannot support claims
* Ownership or financial information is unreliable

## Revenue trend

Clear:

* Stable or understandable growth or decline

Needs Work:

* Recent decline needs explanation

Major Concern:

* Severe unexplained decline
* Unreliable reporting

## Profit quality

Clear:

* Reported profit and adjustments are clear

Needs Work:

* Some adjustments need support

Major Concern:

* Material earnings claims cannot be supported

## Client concentration

Clear:

* Risk is manageable or understood

Needs Work:

* Concentration needs a retention plan

Major Concern:

* One client loss could materially damage the business

## Owner dependence

Clear:

* Client and operating relationships can transfer

Needs Work:

* Owner retains too many responsibilities

Major Concern:

* Business may not operate or retain clients without owner

## Employee dependence

Clear:

* Key staff and risks are understood

Needs Work:

* One person carries unusual risk

Major Concern:

* Likely employee departure could disrupt service

## Business processes

Clear:

* Important work is sufficiently documented

Needs Work:

* Some knowledge exists only in people’s heads

Major Concern:

* No reliable handoff exists for core work

## Legal and business records

Clear:

* Ownership, licenses, contracts, leases, and disputes are understood

Needs Work:

* Some records are missing or outdated

Major Concern:

* A legal or ownership issue may block the sale

## Price, timing, and transition

Clear:

* Expectations and transition appear workable

Needs Work:

* One major issue requires discussion

Major Concern:

* Seller expectations are incompatible with a plausible process

## Buyer demand

Clear:

* There is a plausible buyer pool

Needs Work:

* Buyer pool is narrow

Major Concern:

* No clear buyer group exists under current terms

The full readiness review must remain private to the seller and CloudTech.

Buyers see only seller-approved relevant disclosures.

---

# 15. SECTION 9 — DOCUMENTS AND ACCESS

Create a staged-access table.

Use columns:

* Stage
* Information visible
* Files visible
* User who can see it
* Required approvals
* System status

## Stage 1 — Anonymous listing

Visible:

* Broad location
* Revenue range
* Service mix
* Staff-size range
* General transition

Files:

* None

## Stage 2 — Approved buyer

Visible:

* Anonymous listing
* Ability to request a specific deal

Files:

* None

## Stage 3 — Request and NDA

Visible:

* Request status
* NDA status

Files:

* None

## Stage 4 — Seller-approved access

Visible:

* Firm identity
* Detailed business summary
* Seller-approved information

Files may include:

* Detailed profile
* Financial summary
* Service-revenue summary
* Anonymized client-concentration summary

Required sequence:

* Buyer approved
* Buyer requested specific deal
* NDA signed
* CloudTech reviewed specific request
* Seller approved buyer
* CloudTech released package

## Stage 5 — Serious review

Visible:

* Additional operating information
* Customer information
* Employee information
* Contract information
* More detailed financial information

Access remains controlled.

## Stage 6 — Accepted offer and diligence

Visible:

* Tax returns
* Detailed client information
* Detailed employee information
* Contracts
* Lease
* Legal records
* Transition records
* Closing records

This is the most sensitive stage.

Create file-folder groups:

* Financial Statements and Taxes
* Revenue and Clients
* Employees
* Ownership and Legal
* Contracts and Leases
* Systems and Operations
* Sale and Transition
* Offers and Due Diligence

Create a role-permission matrix for:

* Seller
* Assigned CloudTech staff
* Other CloudTech staff
* Registered buyer
* Approved buyer
* Seller-approved buyer
* Diligence buyer
* Approved adviser

Include file metadata:

* File name
* Folder
* Version
* Upload date
* Uploader
* Review status
* Access level
* Released-to list
* View history
* Download history
* Expiration
* Redaction status
* Watermark status

---

# 16. SECTION 10 — BUYER-SELLER MATCHING

Do not use a hidden match percentage.

Do not use machine-learning language.

Use explainable fit labels:

* Strong Fit
* Possible Fit
* Weak Fit

Create a six-step matching process:

1. Remove buyers who fail basic requirements
2. Compare the remaining buyers using clear fit factors
3. CloudTech reviews the shortlist
4. Seller sees fit label and reasons
5. Seller may approve, reject, delay, or ask for more
6. Any deal-specific request still goes through the separate request-review process

Use these matching factors:

* Buyer approval
* Funding readiness
* Location
* Firm size
* Service mix
* Buyer type
* Accounting or tax experience
* Operating experience
* Timing
* Transition preference
* Conflict status
* Reason for interest
* Prior responsiveness as a future optional signal

Create two clearly separate cards.

## General match recommendation

Meaning:

CloudTech believes the buyer may fit a listing.

This does not:

* Create an access request
* Sign an NDA
* Review the specific request
* Approve document access

## Specific access-request review

This happens only after:

* Buyer viewed the anonymous listing
* Buyer requested that listing
* Buyer signed the NDA

CloudTech then:

* Recommends
* Holds
* Declines
* Asks for more

The seller then decides.

---

# 17. SECTION 11 — FULL 17-STEP TRANSACTION FLOW

Create a horizontal or multi-row process diagram with these exact 17 steps.

1. Seller submits interest
2. Seller provides business information
3. Seller uploads required files
4. CloudTech reviews readiness
5. Seller approves listing
6. CloudTech approves listing
7. Buyer creates account
8. Buyer completes purchase profile
9. CloudTech approves buyer
10. Buyer views anonymous listing
11. Buyer requests access
12. Buyer signs NDA
13. CloudTech reviews the specific request
14. Seller approves buyer
15. CloudTech releases selected documents
16. Buyer submits offer
17. Seller accepts offer for diligence

For every step, show:

* Primary role
* Main action
* Resulting state
* Human involvement
* Required previous state
* Next allowed action

Create separate simplified flow diagrams for:

## Seller flow

Interest → Information → Files → Readiness → Listing approval → Buyer review → Document decisions → Offer → Diligence

## Buyer flow

Account → Purchase profile → Approval → Anonymous listing → Request → NDA → Seller-approved documents → Offer → Diligence

## CloudTech staff flow

Seller help → Readiness → Listing approval → Buyer check → Matching → Specific request review → Document release → Offer support → Diligence support

---

# 18. INFORMATION MODEL

Create a detailed information inventory.

Use columns:

* Information group
* What is collected
* Who provides it
* When it is collected
* How CloudTech checks it
* Where it is stored
* Who can see it
* Why it is needed

Include:

* Buyer account
* Buyer organization
* Buyer purchase preferences
* Buyer funding
* Buyer financing
* Buyer experience
* Buyer checks
* Seller account
* Seller ownership
* Seller business information
* Seller financials
* Seller clients
* Seller employees
* Seller transition
* Listing
* Document
* Buyer-seller match
* Access request
* NDA
* Seller access decision
* Meeting
* Question
* Offer
* Due-diligence request
* Deal stage
* Closing task
* Transition task

This should be readable by a business stakeholder.

Do not turn it into a technical database schema.

---

# 19. LOW-FIDELITY WIREFRAMES

Create at least these 19 wireframes.

For each wireframe, show:

* User role
* Purpose
* Information shown
* Main actions
* Next result

## Seller wireframes

1. Seller interest form
2. Seller dashboard
3. Seller business-information form
4. Seller file-upload area
5. Seller-readiness review
6. Seller listing preview
7. Seller buyer-review page
8. Seller deal-progress page

## Buyer wireframes

9. Buyer signup
10. Buyer purchase profile
11. Buyer marketplace or matches
12. Anonymous listing
13. Access request and NDA
14. Buyer document area
15. Buyer offer
16. Buyer deal-progress page

## CloudTech staff wireframes

17. CloudTech staff dashboard
18. Internal seller review
19. Internal buyer review
20. Matching shortlist
21. Deal-specific access-request review
22. Staff deal-progress and diligence page

Create these as a structured wireframe library, not scattered frames.

---

# 20. HIGH-FIDELITY PRODUCT SCREENS

Create all screens below using the design system.

## Seller Screen 1 — Interest Form

Fields:

* Name
* Email
* Phone
* Firm location
* Approximate annual revenue
* Main services
* Intended timing
* Reason for selling

Primary action:

* Submit Interest

Secondary content:

* What happens next
* Confidentiality note
* Assigned contact after submission

## Seller Screen 2 — Dashboard

Show:

* 17-step progress
* Current stage
* Next step
* Assigned CloudTech contact
* Seller tasks
* Business information status
* File status
* Readiness status
* Listing status
* Buyer-access status
* Offer status
* Diligence status

## Seller Screen 3 — Business Information

Fields:

* Legal firm name
* Entity
* Ownership
* Authority
* Revenue
* Employees
* Locations
* Services
* Licenses
* Systems
* Owner weekly role
* Client-service model
* Confidentiality concerns
* Transition preferences

Actions:

* Save
* Save and Return Later
* Submit for Review

## Seller Screen 4 — File Upload

Rows:

* 2024 and 2025 profit-and-loss statements
* 2024 and 2025 tax returns
* Current-year financials
* Service-revenue summary
* Client-concentration summary
* Employee summary
* Contracts
* Lease
* Ownership records

Show:

* Missing
* Uploaded
* Reviewing
* Accepted
* Replacement Requested

## Seller Screen 5 — Readiness Review

Show readiness rows with:

* Area
* Status
* Plain-language reason
* Seller action
* CloudTech note

## Seller Screen 6 — Listing Preview

Show:

* Anonymous listing
* Private profile
* Hidden information
* Stage-by-stage visibility
* Seller approval status
* CloudTech approval status

Actions:

* Approve Listing
* Request Edit
* Pause

## Seller Screen 7 — Buyer Review

Show buyers such as:

### Evergreen Accounting Partners

* Marcus Lee
* Strong Fit
* Approved buyer
* Reviewed funding status
* Accounting experience
* Pacific Northwest interest
* Accepts transition
* NDA signed
* CloudTech recommended

### Northwest CPA Partners

* Possible Fit
* Strong accounting experience
* Slower timeline

### Summit Search Fund

* Weak Fit
* Funding review incomplete

Actions:

* Approve Access
* Reject
* Delay
* Ask for More Information

## Seller Screen 8 — Deal Progress

Show:

* Offer summary
* Current deal stage
* Open tasks
* Diligence requests
* Due dates
* File releases
* Meetings
* Transition tasks

---

## Buyer Screen 1 — Signup

Fields:

* Name
* Email
* Phone
* Password
* Buyer type
* Organization
* Website
* Role

Primary action:

* Create Buyer Account

## Buyer Screen 2 — Purchase Profile

Fields:

* Target location
* Target revenue
* Target services
* Target profit
* Deal-size range
* Available equity
* Financing plan
* Lender status
* Prior deals
* Accounting experience
* Operating experience
* Timing
* Transition preference

Primary action:

* Submit Profile for Review

## Buyer Screen 3 — Marketplace and Matches

Show anonymous listing cards.

Each card includes:

* Anonymous title
* Broad location
* Revenue range
* Services
* Staff-size range
* Transition
* Strong, Possible, or Weak Fit
* Plain fit reasons

Actions:

* View Listing
* Save
* Decline

## Buyer Screen 4 — Anonymous Listing

Example listing:

* Opportunity CT-1042
* Pacific Northwest Tax and Bookkeeping Practice
* Revenue: $1.2M–$1.4M
* Services: Tax, bookkeeping, advisory
* Employees: 9 full-time, 2 seasonal
* Transition: 6–12 months

Hidden:

* Firm name
* Owner name
* Exact address
* Client names
* Raw files
* Tax returns
* Personal employee information

Actions:

* Save Listing
* Request Access
* Decline

## Buyer Screen 5 — Access Request and NDA

Show:

* Buyer identity
* Listing
* Reason for interest
* Financing summary
* Requested access
* Request status
* NDA status

Actions must happen separately:

1. Submit Access Request
2. Sign NDA

After NDA, display:

“CloudTech can now review this specific request. No private documents have been released.”

## Buyer Screen 6 — Document Area

Locked state:

* Seller has not approved access
* Or CloudTech has not released the package

Released state:

* Detailed business summary
* 2025 P&L summary
* 2026 year-to-date summary
* Service-revenue summary
* Anonymized client-concentration summary

Show:

* View-only status
* Release date
* Access expiration
* Questions
* Current stage

## Buyer Screen 7 — Offer

Use example data:

* Purchase price: $2.45M
* Cash at close: 80%
* Seller note: 10%
* Earnout: 10%
* Target close: September 30, 2026
* Transition: 6 months

Actions:

* Save Draft
* Submit Offer

Offer must remain locked until documents are released.

## Buyer Screen 8 — Deal Progress

Show:

* Current offer status
* Seller response
* Open questions
* Meetings
* Diligence
* Files
* Deadlines
* Next action

---

## Staff Screen 1 — CloudTech Dashboard

Show KPIs:

* Active listings
* Sellers in preparation
* Buyers awaiting review
* Approved buyers
* Access requests
* Seller decisions pending
* Offers
* Diligence deals

Show a work queue with:

* Seller listing approval
* Missing seller files
* Buyer approval
* Match shortlist review
* Access-request review
* Document release
* Offer review
* Diligence task

## Staff Screen 2 — Internal Seller Review

Show:

* Interest status
* Ownership
* Authority
* Business information
* File completeness
* Readiness
* Seller listing approval
* CloudTech final approval
* Listing active status

Actions:

* Open Readiness
* Open Listing
* Request Information
* Approve Listing
* Hold

## Staff Screen 3 — Internal Buyer Review

Show:

* Buyer account
* Organization
* Role
* Purchase criteria
* Funding status
* Proof status
* Prior acquisitions
* Accounting experience
* Operating experience
* Conflicts
* Approval status

Actions:

* Approve
* Restrict
* Ask for More
* Reject

## Staff Screen 4 — Matching Shortlist

Columns:

* Buyer
* Required checks
* Fit label
* Plain reasons
* Staff action

Actions:

* Recommend Match
* Hold
* Remove

Display a warning:

“Matching never grants access.”

## Staff Screen 5 — Deal-Specific Access-Request Review

Show separate rows for:

* Listing active
* Buyer profile submitted
* Buyer approved
* General match recommendation
* Access requested
* NDA signed
* CloudTech request review
* Seller approval
* Documents released

Include a staff note to seller.

Actions:

* Recommend Request
* Hold
* Ask Buyer for More
* Decline
* Release Selected Documents

The Release Selected Documents action must remain locked until the seller has approved the buyer.

## Staff Screen 6 — Deal Progress and Diligence

Show:

* Offer
* Seller response
* Current stage
* Task owner
* Due date
* Status
* Released information
* Open issue
* Next step

Example tasks:

* Seller uploads 2026 receivables aging
* CloudTech reviews lease response
* Buyer confirms lender diligence list
* Seller submits top-25-client retention plan

---

# 21. PROTOTYPE STATE LOGIC

Create prototype variables or equivalent interactive states when supported.

Use these states:

* sellerInterest
* businessSaved
* filesUploaded
* readinessReviewed
* sellerListingApproved
* cloudtechListingApproved
* buyerSignup
* buyerProfileSubmitted
* buyerApproved
* matchRecommended
* anonymousListingViewed
* accessRequested
* ndaSigned
* cloudtechRequestReviewed
* sellerAccessApproved
* documentsReleased
* offerSubmitted
* offerAcceptedForDiligence
* diligenceOpened

## Listing activation

Listing is active only when:

* sellerInterest = true
* businessSaved = true
* filesUploaded = true
* readinessReviewed = true
* sellerListingApproved = true
* cloudtechListingApproved = true

## Seller approval of buyer

Seller can approve buyer access only when:

* Listing is active
* Buyer profile submitted
* Buyer approved
* Buyer requested this listing
* NDA signed
* CloudTech reviewed this specific request

## Document release

CloudTech can release documents only when:

* Seller approved buyer access

## Offer

Buyer can submit offer only when:

* Documents released

## Diligence

Diligence opens only when:

* Offer submitted
* Seller accepted offer for diligence

## Separate states that must never be merged

Keep these distinct:

* matchRecommended
* cloudtechRequestReviewed

Keep these distinct:

* anonymousListingViewed
* accessRequested

Keep these distinct:

* ndaSigned
* sellerAccessApproved

Keep these distinct:

* sellerAccessApproved
* documentsReleased

Keep these distinct:

* offerSubmitted
* diligenceOpened

---

# 22. GUIDED PROTOTYPE

Create a clearly labeled prototype entry point:

“START — Guided CloudTech Marketplace Demo”

Include:

* Role switcher
* Seller
* Buyer
* CloudTech staff
* Run / Next Guided Step button
* Reset Demo button
* Progress bar
* “X of 17 steps complete”
* Next-step label
* Left navigation for role-specific screens

The guided experience must advance through:

1. Seller interest
2. Business information
3. File upload
4. Readiness review
5. Seller listing approval
6. CloudTech listing approval
7. Buyer signup
8. Buyer purchase profile
9. CloudTech buyer approval
10. Anonymous listing view
11. Access request
12. NDA
13. CloudTech deal-specific request review
14. Seller buyer approval
15. CloudTech document release
16. Buyer offer
17. Seller acceptance for diligence

Create locked, pending, active, approved, and completed variants.

Use subtle Smart Animate transitions.

Do not use flashy motion.

---

# 23. DEMO CONTENT

Use fictional data only.

Display a visible notice:

“Demo only. Fictional people and firms. Identity, funding, files, signatures, security, and payments are simulated. Do not enter real confidential information.”

Use these fictional examples consistently:

## Seller

* Elena Martinez
* Martinez Tax & Advisory LLC
* Seattle, Washington
* $1.32M annual revenue
* 9 full-time employees
* 2 seasonal employees
* Tax, bookkeeping, and advisory
* Retirement
* 6–12 month transition

## Buyer

* Marcus Lee
* Evergreen Accounting Partners
* Head of Acquisitions
* Washington, Oregon, and virtual
* Target revenue: $1M–$5M
* Available equity: $3M reviewed amount
* Cash and bank debt
* Three prior accounting-practice acquisitions

## CloudTech staff

* Maya Chen
* Deal lead

## Listing

* CT-1042
* Pacific Northwest Tax and Bookkeeping Practice
* Revenue: $1.2M–$1.4M
* Services: Tax, bookkeeping, advisory
* Employees: 9 full-time, 2 seasonal
* Transition: 6–12 months

## Offer

* $2.45M
* 80% cash
* 10% seller note
* 10% earnout
* September 30, 2026 close
* 6-month transition

---

# 24. OPEN DECISIONS

Create a dedicated internal-decision section with cards for:

* Is CloudTech the broker, marketplace operator, buyer, or more than one?
* How are conflicts disclosed if CloudTech may also bid?
* What locations and firm sizes are accepted first?
* Should CloudTech offer a free valuation discussion?
* What buyer checks are mandatory?
* Who verifies identity, funds, experience, and references?
* Can all registered buyers see anonymous listings?
* Should only approved buyers see listings?
* Is one NDA sufficient?
* Is a second diligence agreement needed?
* What document host or data room is used?
* What files are view-only?
* What files can be downloaded?
* Are files watermarked?
* How long is access retained?
* What happens when access is removed?
* How much post-introduction work does CloudTech perform?
* What fees can CloudTech charge?
* What licensing, brokerage, privacy, and securities rules apply?
* What is the scope of the first manual pilot?
* What marketplace metrics are tracked?

Clearly mark these as open business, legal, security, or technical decisions.

Do not present them as decided product requirements.

---

# 25. COMPONENT SYSTEM

Create reusable components with variants.

## Buttons

* Primary
* Secondary
* Ghost
* Destructive
* Positive
* Disabled
* Loading

Sizes:

* Small
* Medium
* Large

## Status badges

* Pending
* Complete
* Active
* Approved
* Restricted
* Locked
* Reviewing
* Needs Work
* Major Concern
* Strong Fit
* Possible Fit
* Weak Fit

Do not rely on color alone.

Always include text or icons.

## Alerts

* Information
* Success
* Warning
* Error
* Locked action

## Cards

* KPI card
* Task card
* Listing card
* Buyer card
* Readiness card
* Offer card
* Human-touchpoint card
* Document card
* Decision card

## Tables

Create flexible components for:

* Research comparison
* Seller process
* Buyer process
* Human touchpoints
* Readiness
* Documents
* Permissions
* Matches
* Information model
* Offers
* Diligence

## Inputs

* Text
* Email
* Phone
* Currency
* Percentage
* Date
* Select
* Multiselect
* Text area
* Checkbox
* Radio
* File upload

## Navigation

* Global top header
* Research sidebar
* Product sidebar
* Role switcher
* Breadcrumb
* Tabs
* Stepper
* Mobile navigation

---

# 26. ACCESSIBILITY

Meet reasonable WCAG AA standards.

Requirements:

* Strong text contrast
* Visible focus states
* Minimum 44 px touch targets where practical
* Status communicated with text and icon, not color only
* Clear form labels
* Error text directly connected to fields
* Keyboard-order annotations
* Legible tables
* No tiny critical text
* Plain-language locked-state explanations

---

# 27. RESPONSIVE BEHAVIOR

For desktop:

* Sticky sidebar
* Two-column forms
* Multi-column dashboards
* Full tables
* Side-by-side comparisons

For mobile:

* Collapse sidebar into a menu
* Convert two-column forms to one column
* Convert tables into stacked cards where needed
* Keep the current stage and next action prominent
* Preserve locked-state explanations
* Make primary action sticky at the bottom where appropriate

---

# 28. HANDOFF REQUIREMENTS

Use:

* Auto Layout throughout
* Named color styles
* Named text styles
* Named effects
* Reusable components
* Component variants
* Consistent layer naming
* Sections for each user role
* Clear frame names
* No detached components unless necessary
* No lorem ipsum
* No unnamed rectangles
* No unexplained placeholder content

Use naming patterns such as:

* SELLER / 01 / Interest
* SELLER / 02 / Dashboard
* BUYER / 01 / Signup
* STAFF / 01 / Dashboard
* FLOW / Step 01
* COMPONENT / Button / Primary
* COMPONENT / Badge / Approved

Add design annotations for:

* Gate logic
* Access permissions
* Human touchpoints
* Sensitive information
* Open legal decisions
* Open technical decisions
* Proposed versus confirmed behavior

---

# 29. FINAL QUALITY CHECK

Before considering the Figma project complete, verify that:

* All three user roles are present
* The nine human CloudTech touchpoints are fully written out
* The 17-step process is complete
* Seller control is clear
* NDA does not release files
* Matching and access-request review are separate
* Seller approval and CloudTech release are separate
* Anonymous listing view and access request are separate
* Every locked action explains what is missing
* All required seller screens exist
* All required buyer screens exist
* All required staff screens exist
* Low-fidelity wireframes exist before high-fidelity screens
* Design-system components exist
* The prototype can be followed from seller inquiry through diligence
* The content is realistic and specific
* No unsupported claim is presented as a confirmed marketplace fact
* No confidential real-world data is used
* The final product looks credible enough to present to a private-equity managing partner

The final Figma project should make it immediately obvious that CloudTech is proposing a high-touch, seller-controlled brokerage workflow supported by a clear digital operating system.
