// =========================
// DOM READY
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  setupSnapshot();
  setupAiCoach();
});

// =========================
// SNAPSHOT LOGIC
// =========================
function setupSnapshot() {
  const btn = document.getElementById("snapshotBtn");
  const output = document.getElementById("snapshotOutput");
  const scoreSelect = document.getElementById("currentScore");
  const cardsInput = document.getElementById("cardsCount");
  const negativesSelect = document.getElementById("negatives");

  if (!btn || !output || !scoreSelect || !cardsInput || !negativesSelect) return;

  btn.addEventListener("click", () => {
    const score = scoreSelect.value;
    const cards = Number(cardsInput.value || 0);
    const negatives = negativesSelect.value;

    let advice = "Here’s the general blueprint: clean payment history, lower utilization, and deal with any negatives.";

    if (!score && !negatives && !cards) {
      advice =
        "Give me at least one detail: score range, how many cards, or if you have collections/charge-offs — then I’ll tell you where to start.";
    } else {
      if (score && score.includes("580")) {
        advice =
          "You’re in the 580–639 range. That’s rebuild mode — not trash, but not where you want to stay. " +
          "You’ll usually see the biggest jumps from getting cards under 30% utilization and attacking any fresh negatives.";
      } else if (score && score.includes("640")) {
        advice =
          "640–699 is ‘almost there’. One good push — cleaning a negative or dropping utilization under 10% — can be the difference between denied and approved.";
      } else if (score && score.includes("Under 500")) {
        advice =
          "Under 500 means the reports are loaded with pain: lates, collections, charge-offs, or no positive history. " +
          "Your win is to slowly stack positive tradelines and start removing or neutralizing the ugliest negatives.";
      }

      if (cards > 0) {
        advice +=
          `\n\nYou listed about ${cards} card(s). Make a list of LIMIT vs BALANCE for each one. ` +
          "Focus on paying down the card that has the highest utilization % first — that one is usually dragging your score the most.";
      }

      if (negatives.includes("Yes")) {
        advice +=
          "\n\nSince you’ve got collections/charge-offs, those are high-priority. " +
          "Step 1: Pull all 3 reports, list every negative with date and amount. " +
          "Step 2: Dispute anything inaccurate. Step 3: For valid ones, look at pay-for-delete or settlements in writing.";
      } else if (negatives.includes("No")) {
        advice +=
          "\n\nNo collections or charge-offs? Good. Your score is probably being held back by utilization and short history. " +
          "This is where low balances and perfect on-time payments are your best friends.";
      }
    }

    output.textContent = advice;
  });
}

// =========================
// AI SCORE COACH
// =========================
function setupAiCoach() {
  const input = document.getElementById("aiQuestion");
  const sendBtn = document.getElementById("aiSendBtn");
  const messagesContainer = document.getElementById("aiMessages");

  if (!input || !sendBtn || !messagesContainer) {
    return;
  }

  function addMessage(sender, text, isTyping = false) {
    const div = document.createElement("div");
    div.classList.add("ai-message");
    div.classList.add(sender === "user" ? "user" : "bot");
    if (isTyping) div.classList.add("typing");

    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return div;
  }

  function getCoachResponse(question) {
    const q = question.toLowerCase();

    // Utilization
    if (q.includes("utilization") || (q.includes("%") && q.includes("card"))) {
      return (
        "Credit utilization is the % of your limits you’re using.\n\n" +
        "Game plan:\n" +
        "1) Add up all card limits.\n" +
        "2) Add up all balances.\n" +
        "3) Divide balances by limits — that’s your utilization.\n\n" +
        "Target: under 30% overall, under 10% if you want elite scores. The card with the highest % is the one to attack first."
      );
    }

    // Collections
    if (q.includes("collection")) {
      return (
        "Collections hit your score hard, but they’re not the end.\n\n" +
        "1) Pull all 3 reports and list each collection with date + amount.\n" +
        "2) Dispute anything that’s old, wrong, or not yours.\n" +
        "3) For valid debts, get pay-for-delete or settlement in writing before paying.\n" +
        "4) After that, stacking fresh positive history slowly drowns out the negative."
      );
    }

    // Late payments
    if (q.includes("late") || q.includes("30 day") || q.includes("60 day") || q.includes("90 day")) {
      return (
        "Late payments are brutal, but fixable over time.\n\n" +
        "• One-time late with good history? Send a goodwill letter asking them to remove it.\n" +
        "• Wrong info? Dispute as inaccurate with the bureaus.\n" +
        "• Going forward, set up auto-pay to at least the minimum.\n\n" +
        "Six to twelve months of clean on-time history can start to soften the damage."
      );
    }

    // Inquiries
    if (q.includes("inquiry") || q.includes("hard pull") || q.includes("hard inquiry")) {
      return (
        "Hard inquiries usually cost a few points and fade with time.\n\n" +
        "You can dispute:\n" +
        "• Inquiries you didn’t authorize\n" +
        "• Inquiries tied to fraud\n\n" +
        "But real score jumps usually come from fixing late pays, collections, and utilization — not chasing inquiries."
      );
    }

    // Points / score increase
    if (q.includes("how many points") || q.includes("how much will my score go up") || q.includes("increase my score")) {
      return (
        "Nobody honest can give you an exact point promise.\n\n" +
        "But we can stack moves that usually raise scores:\n" +
        "1) Get every card under 30% utilization (under 10% is best).\n" +
        "2) Clean up collections / charge-offs.\n" +
        "3) Keep all active accounts on-time.\n" +
        "4) Don’t open a bunch of new accounts back-to-back.\n\n" +
        "You do these consistently, your score has no choice but to move."
      );
    }

    // Tradelines / AUs
    if (q.includes("tradeline") || q.includes("trade line") || q.includes("authorized user") || q.includes("au")) {
      return (
        "Tradelines and authorized user spots can help, but they’re not magic.\n\n" +
        "They work best when:\n" +
        "• The account is old\n" +
        "• Perfect payment history\n" +
        "• Low utilization\n\n" +
        "If your own reports are full of fresh negatives, fixing those first usually gives you more score for your effort."
      );
    }

    // Charge-offs
    if (q.includes("charge off") || q.includes("charge-off")) {
      return (
        "Charge-offs look bad, but there’s still strategy.\n\n" +
        "1) Verify everything: dates, amounts, status.\n" +
        "2) If there are errors, dispute them.\n" +
        "3) If it’s valid, try a settlement, but get the terms in writing.\n" +
        "4) Focus on building new positive history so the charge-off becomes just one line in a sea of good accounts."
      );
    }

    // Default / generic answer
    return (
      "Here’s how your score really works:\n\n" +
      "• Payment history (about 35%)\n" +
      "• Utilization / balances (about 30%)\n" +
      "• Age of history\n" +
      "• New credit\n" +
      "• Mix of accounts\n\n" +
      "Tell me:\n" +
      "1) Your rough score range\n" +
      "2) About how many cards and if they’re maxed\n" +
      "3) If you’ve got collections, charge-offs, or lates\n\n" +
      "I’ll tell you in what order I’d fix things for the fastest wins."
    );
  }

  function handleSend() {
    const text = (input.value || "").trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";
    input.focus();

    const typingNode = addMessage("bot", "Coach is thinking...", true);

    setTimeout(() => {
      if (typingNode && typingNode.parentNode) {
        typingNode.parentNode.removeChild(typingNode);
      }
      const reply = getCoachResponse(text);
      addMessage("bot", reply);
    }, 600);
  }

  function addMessage(sender, text, isTyping = false) {
    const div = document.createElement("div");
    div.classList.add("ai-message");
    div.classList.add(sender === "user" ? "user" : "bot");
    if (isTyping) div.classList.add("typing");
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return div;
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });
}
