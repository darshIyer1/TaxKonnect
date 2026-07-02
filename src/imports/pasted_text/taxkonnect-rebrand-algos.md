Edit the CURRENT project. Do not restart, redesign the visual system, or remove existing screens and workflow logic.

Make only the targeted product changes below.

# 1. REBRAND EVERYTHING TO TaxKonnect

Replace every user-facing instance of:

* CloudTech
* CloudTech Marketplace
* CloudTech Brokerage Marketplace
* CloudTech staff
* CloudTech recommendation
* CloudTech review

with the correct TaxKonnect language.

Use consistently:

* **TaxKonnect**** Accounting Practice Marketplace**
* **TaxKonnect**** staff**
* **TaxKonnect**** deal lead**
* **TaxKonnect**** review**
* **TaxKonnect**** recommendation**
* **TaxKonnect**** Transaction Services**

Update:

* Headers
* Page titles
* Navigation
* Buttons
* Alerts
* Research sections
* Human touchpoints
* Emails
* NDA labels
* Document-release language
* Staff dashboards
* Prototype instructions

Change Maya Chen’s title to:

**Deal Lead — ****TaxKonnect**

Use:

**[maya.chen@](mailto:maya.chen@ankrok.com)**[**TaxKonnect**](mailto:maya.chen@ankrok.com)**[.com](mailto:maya.chen@ankrok.com)**

Do not use “CloudTech” or “AnchorRock” anywhere in the rendered project.

For legal documents, do not invent a formal TaxKonnect legal entity. Use:

**Sample confidentiality agreement for prototype purposes — not legal advice.**

# 2. ADD BOTH A MATCHING ALGORITHM AND A RANKING ALGORITHM

The current design shows fit labels, but it does not clearly distinguish the two separate algorithms.

AnkRok needs BOTH:

## A. Matching Algorithm

Purpose:

Determine whether a specific buyer and specific listing are compatible and explain why.

The matching algorithm must evaluate buyer-to-listing fit using:

### Hard eligibility checks

* Listing is active
* Buyer is approved
* Buyer type is allowed by seller
* Geography is acceptable
* Revenue/deal-size range overlaps
* Funding capacity is sufficient
* No known conflict
* Timing is feasible
* Transition expectations are not fundamentally incompatible

A failed hard requirement may make the pair ineligible even if other attributes align.

### Weighted fit factors

After passing hard checks, evaluate:

* Geographic fit
* Revenue and deal-size fit
* Service-line fit
* Funding readiness
* Accounting/tax experience
* Acquisition experience
* Operating experience
* Timing fit
* Transition fit
* Strategic reason for interest

The matching algorithm should create:

* Match eligibility: Eligible / Ineligible / Needs Review
* Match strength: Strong Fit / Possible Fit / Weak Fit
* Plain-language fit reasons
* Identified gaps
* Human-review status
* Date last evaluated

AnkRok staff may see an internal scoring breakdown, but sellers and buyers should primarily see the fit label and plain-language reasons.

Do not present the algorithm as AI or machine learning.

AnkRok staff must still review the match before it is shown as a recommendation.

## B. Ranking Algorithm

Purpose:

Order otherwise eligible matches by priority.

The ranking algorithm must be visibly separate from the matching algorithm.

It should rank:

1. Listings for a specific buyer
2. Buyers for a specific listing

The ranking algorithm may use:

* Matching-algorithm result
* Buyer readiness
* Funding-review status
* Listing readiness
* Timing urgency
* Request completeness
* Responsiveness
* Recent relevant activity
* Seller preferences
* Whether the buyer has shown specific interest

The ranking algorithm must not:

* Grant access
* Replace AnkRok review
* Replace seller choice
* Automatically reject a buyer
* Rank based on payment or favoritism
* Treat popularity as compatibility

Create separate labels:

* **Match Strength**
* **Rank**
* **Why Matched**
* **Why Ranked Here**

Example:

* Rank #1
* Strong Fit
* Ranked first because funding is reviewed, geography and services align, timing matches, and the buyer has relevant acquisition experience.

A buyer could be a Strong Fit but rank below another Strong Fit. Make this distinction visually obvious.

# 3. ADD THE REQUIRED MATCHING AND RANKING SCREENS

## Buyer Marketplace

Update listing cards to show:

* Rank position
* Match Strength
* Why Matched
* Why Ranked Here
* Any open fit concern

Add sorting options:

* Recommended Order
* Strongest Match
* Newest Listings
* Revenue
* Location
* Transition Timing

“Recommended Order” must come from the ranking algorithm.

## AnkRok Matching Workspace

Create or upgrade the staff Matching screen with two tabs:

### Tab 1 — Matching Analysis

For one buyer/listing pair, show:

* Hard eligibility checks
* Weighted fit-factor breakdown
* Match Strength
* Plain reasons
* Gaps
* Staff notes
* Recommend Match
* Hold
* Mark Ineligible

### Tab 2 — Ranked Shortlist

For a listing, show ranked eligible buyers:

* Rank
* Buyer
* Match Strength
* Funding readiness
* Relevant experience
* Timing
* Transition fit
* Reason for interest
* Why Ranked Here
* AnkRok review status
* Seller-facing recommendation status

Add a second view that ranks listings for a buyer.

Keep these states separate:

* Algorithmically matched
* Ranked
* AnkRok-reviewed
* Recommended to seller
* Specific access request submitted
* Specific access request reviewed

A ranked buyer has not automatically requested access.

# 4. UPDATE RESEARCH AND PROCESS DOCUMENTATION

Revise the Buyer-Seller Matching section to explain both systems.

Create two side-by-side process cards:

## Matching Algorithm

“Determines whether a buyer and listing are compatible and explains the fit.”

## Ranking Algorithm

“Orders eligible matches so AnkRok can prioritize the most relevant opportunities and buyers.”

Add a diagram:

Buyer profile + listing requirements
→ eligibility checks
→ matching analysis
→ AnkRok human review
→ eligible match pool
→ ranking algorithm
→ ranked recommendations
→ seller or buyer action

Clearly state:

* Matching determines compatibility.
* Ranking determines order.
* Neither grants confidential access.
* AnkRok reviews recommendations.
* The seller controls private access.

# 5. ADD ANKROK TRANSACTION SERVICES AFTER DILIGENCE

The current project treats diligence as the final major stage. AnkRok intends to remain involved after diligence through definitive documentation, financing, closing, and transition.

Do not turn this into a general professional-services marketplace.

Add a focused, embedded transaction-services layer called:

# AnkRok Transaction Services

This should help the parties coordinate the professionals required to move from diligence to closing.

Include these service categories:

## Transaction Counsel

Purpose:

* Purchase agreement
* Disclosure schedules
* Legal due diligence
* Entity and regulatory documents
* Closing documents
* Legal closing checklist

Label clearly:

**Provided by an engaged external lawyer or law firm. AnkRok coordinates the workflow but does not provide legal advice unless properly authorized and licensed.**

## Lightweight M&A / Investment-Banking Support

Purpose:

* Deal-structure support
* Negotiation coordination
* Offer and term comparison
* Financing coordination
* Process management
* Closing preparation
* Buyer/seller communication

Use the user-facing name:

**M&A and Deal Advisory**

Do not overstate AnkRok as a full investment bank unless legally established to operate as one.

## Accounting and Tax Advisory

Purpose:

* Quality-of-earnings support
* Working-capital review
* Tax structuring
* Purchase-price allocation
* Financial closing support

## Financing Coordination

Purpose:

* Lender introductions
* Financing checklist
* Lender diligence
* Approval status
* Funding conditions
* Closing-funds coordination

## Escrow and Closing Administration

Purpose:

* Escrow coordination
* Signature tracking
* Funds-flow checklist
* Closing deliverables
* Final closing confirmation

## Employee, Client, and Transition Planning

Purpose:

* Staff communication plan
* Client-notification plan
* Seller transition schedule
* Responsibility handoff
* First-30/60/90-day transition tasks

# 6. ADD A TRANSACTION SERVICES HUB

Create a new seller, buyer, and AnkRok staff screen:

## Transaction Services

Show service cards for each category.

Each service card must display:

* Service category
* Why it is needed
* Assigned provider
* AnkRok coordinator
* Engagement status
* Scope
* Current tasks
* Required documents
* Next milestone
* Responsible party
* Fees or engagement status
* Open issues

Use statuses:

* Not Yet Needed
* Provider Needed
* Introduction Requested
* Provider Selected
* Engagement Pending
* Engaged
* In Progress
* Waiting on Client
* Complete

Actions may include:

* Request AnkRok Introduction
* Select Provider
* Review Scope
* Upload Engagement Letter
* Assign Task
* Mark Complete
* Contact AnkRok

Do not imply that clicking a button creates an attorney-client, investment-banking, tax, or lending relationship.

# 7. EXTEND THE TRANSACTION FLOW

Keep the existing marketplace flow through diligence, then add a clearly separated second phase.

## Phase 1 — Marketplace and Deal Formation

Keep the current steps through:

* Offer accepted for diligence
* Diligence opened
* Diligence completed

## Phase 2 — Transaction Execution and Closing

Add:

18. Parties select required transaction services
19. Counsel and advisers prepare definitive documents and financing
20. AnkRok coordinates closing readiness and unresolved conditions
21. Transaction closes and transition begins

Update:

* Progress indicators
* Research process map
* Seller deal progress
* Buyer deal progress
* Staff deal progress
* Closing checklist
* Human touchpoints
* Guided prototype

The prototype should now reach:

**21 of 21 steps complete**

Do not treat the closing as automatic when diligence is completed.

# 8. SPLIT THE FINAL HUMAN TOUCHPOINTS

The current human-touchpoint section combines diligence, closing, and transition.

Replace it with:

## 9. Diligence Coordination

AnkRok work:

* Organize requests
* Assign owners
* Coordinate approvals
* Manage secure releases
* Track issues and deadlines
* Prepare parties for the diligence decision

Decision:

* Continue
* Renegotiate
* Pause
* End deal
* Complete diligence

## 10. Transaction Services, Closing, and Transition

AnkRok work:

* Identify required advisers
* Coordinate introductions
* Track engagements
* Support deal structuring
* Coordinate definitive documents
* Coordinate financing conditions
* Maintain closing checklist
* Track signatures and funds flow
* Coordinate staff/client transition planning

Decision:

* Ready to close
* Conditions outstanding
* Delay
* Renegotiate
* Close
* Begin transition

# 9. POST-DILIGENCE DASHBOARD

Add a post-diligence closing workspace showing:

* Current transaction stage
* Required service providers
* Provider engagement status
* Definitive agreement status
* Financing status
* Legal open items
* Accounting/tax open items
* Closing conditions
* Signature status
* Funds-flow status
* Target close date
* Client communication plan
* Employee communication plan
* Transition start date
* Current owner
* Next action
* Overdue items

Use September 30, 2026 as the fictional target close date.

# 10. PRESERVE EXISTING PRODUCT PRINCIPLES

Do not change:

* Seller-controlled confidentiality
* Anonymous listings
* Buyer approval
* Deal-specific access requests
* NDA separation
* AnkRok request review
* Seller access approval
* Separate document release
* Offer stage
* Diligence controls
* Explainable fit labels
* Human AnkRok judgment

Do not add:

* Auctions
* Public bidding
* Automated seller approval
* Automatic document release
* Hidden black-box AI
* Pay-to-rank placement
* Unrelated professional-services browsing

# 11. FINAL ACCEPTANCE CHECK

Before finishing, verify:

* No “CloudTech” remains
* No “AnchorRock” remains
* AnkRok branding is consistent
* Matching algorithm exists
* Ranking algorithm exists
* Their purposes are visibly different
* Buyer listings display both Match Strength and Rank
* Staff can inspect matching factors
* Staff can inspect ranked shortlists
* Ranking does not grant access
* Matching does not replace human review
* Transaction Services hub exists
* Transaction Counsel exists
* M&A and Deal Advisory exists
* Accounting and Tax Advisory exists
* Financing Coordination exists
* Escrow and Closing Administration exists
* Transition Planning exists
* Diligence and post-diligence are separate phases
* Guided flow reaches 21 of 21
* Closing is not automatic
* Existing marketplace screens and visual system remain intact
