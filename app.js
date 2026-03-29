const STORAGE_KEY = "fridge-flow-ai:v1";

const INGREDIENT_LIBRARY = [
  { key: "egg", label: "Egg", aliases: ["egg", "eggs", "gyeran"], shelfLifeDays: 21, safetyBufferDays: 5, unit: "ea" },
  { key: "milk", label: "Milk", aliases: ["milk", "uyu"], shelfLifeDays: 7, safetyBufferDays: 2, unit: "pack" },
  { key: "yogurt", label: "Yogurt", aliases: ["yogurt", "greek yogurt"], shelfLifeDays: 10, safetyBufferDays: 2, unit: "cup" },
  { key: "cheese", label: "Cheese", aliases: ["cheese"], shelfLifeDays: 14, safetyBufferDays: 3, unit: "slice" },
  { key: "tofu", label: "Tofu", aliases: ["tofu", "dubu"], shelfLifeDays: 5, safetyBufferDays: 1, unit: "block" },
  { key: "chicken", label: "Chicken", aliases: ["chicken", "dak"], shelfLifeDays: 3, safetyBufferDays: 1, unit: "pack" },
  { key: "beef", label: "Beef", aliases: ["beef", "sogogi"], shelfLifeDays: 4, safetyBufferDays: 1, unit: "pack" },
  { key: "pork", label: "Pork", aliases: ["pork", "dwaeji"], shelfLifeDays: 4, safetyBufferDays: 1, unit: "pack" },
  { key: "bacon", label: "Bacon", aliases: ["bacon"], shelfLifeDays: 7, safetyBufferDays: 2, unit: "pack" },
  { key: "shrimp", label: "Shrimp", aliases: ["shrimp"], shelfLifeDays: 3, safetyBufferDays: 1, unit: "pack" },
  { key: "kimchi", label: "Kimchi", aliases: ["kimchi", "gimchi"], shelfLifeDays: 30, safetyBufferDays: 7, unit: "jar" },
  { key: "tomato", label: "Tomato", aliases: ["tomato", "tomatoes"], shelfLifeDays: 7, safetyBufferDays: 2, unit: "ea" },
  { key: "onion", label: "Onion", aliases: ["onion", "yangpa"], shelfLifeDays: 20, safetyBufferDays: 4, unit: "ea" },
  { key: "potato", label: "Potato", aliases: ["potato", "gamja"], shelfLifeDays: 21, safetyBufferDays: 4, unit: "ea" },
  { key: "carrot", label: "Carrot", aliases: ["carrot", "danggeun"], shelfLifeDays: 14, safetyBufferDays: 3, unit: "ea" },
  { key: "spinach", label: "Spinach", aliases: ["spinach", "sigumchi"], shelfLifeDays: 5, safetyBufferDays: 1, unit: "bag" },
  { key: "lettuce", label: "Lettuce", aliases: ["lettuce", "romaine", "sangchu"], shelfLifeDays: 6, safetyBufferDays: 2, unit: "bag" },
  { key: "cucumber", label: "Cucumber", aliases: ["cucumber", "oi"], shelfLifeDays: 7, safetyBufferDays: 2, unit: "ea" },
  { key: "bellpepper", label: "Bell Pepper", aliases: ["bell pepper", "pepper", "paprika"], shelfLifeDays: 8, safetyBufferDays: 2, unit: "ea" },
  { key: "mushroom", label: "Mushroom", aliases: ["mushroom", "mushrooms", "beoseot"], shelfLifeDays: 5, safetyBufferDays: 1, unit: "pack" },
  { key: "broccoli", label: "Broccoli", aliases: ["broccoli"], shelfLifeDays: 6, safetyBufferDays: 2, unit: "head" },
  { key: "avocado", label: "Avocado", aliases: ["avocado"], shelfLifeDays: 4, safetyBufferDays: 1, unit: "ea" },
  { key: "apple", label: "Apple", aliases: ["apple"], shelfLifeDays: 21, safetyBufferDays: 5, unit: "ea" },
  { key: "banana", label: "Banana", aliases: ["banana"], shelfLifeDays: 5, safetyBufferDays: 1, unit: "ea" },
  { key: "springOnion", label: "Spring Onion", aliases: ["spring onion", "scallion", "daepa"], shelfLifeDays: 7, safetyBufferDays: 2, unit: "stalk" },
  { key: "bread", label: "Bread", aliases: ["bread", "toast"], shelfLifeDays: 5, safetyBufferDays: 1, unit: "slice" },
  { key: "tortilla", label: "Tortilla", aliases: ["tortilla", "wrap"], shelfLifeDays: 10, safetyBufferDays: 2, unit: "sheet" },
];

const TREND_SIGNALS = {
  "protein-forward": { key: "protein-forward", label: "Protein-forward", weight: 1.12 },
  "global-flavor": { key: "global-flavor", label: "Global flavor", weight: 1.1 },
  "balanced-comfort": { key: "balanced-comfort", label: "Balanced comfort", weight: 1.09 },
  "blood-sugar": { key: "blood-sugar", label: "Blood sugar aware", weight: 1.06 },
  "brunch-cafe": { key: "brunch-cafe", label: "Brunch cafe", weight: 1.08 },
  "portable-fresh": { key: "portable-fresh", label: "Portable fresh", weight: 1.05 },
};

const RECIPES = [
  { id: "shakshuka-pan", name: "Shakshuka-style Egg Pan", description: "A fast skillet idea for tomato, onion, and eggs.", required: ["egg", "tomato", "onion"], optional: ["spinach", "cheese", "bread"], mealSlots: ["breakfast", "lunch"], trendTags: ["global-flavor", "protein-forward", "brunch-cafe"], difficulty: "Easy", time: 15, serve: "Bread or tortilla works well on the side.", steps: ["Cook onion and tomato until jammy.", "Season lightly and crack in eggs.", "Cover on low heat until set.", "Finish with cheese or spinach if you have them."] },
  { id: "tomato-egg-bowl", name: "Tomato Egg Bowl", description: "One of the quickest ways to turn eggs and tomato into a full meal.", required: ["egg", "tomato"], optional: ["springOnion", "onion"], mealSlots: ["breakfast", "lunch", "dinner"], trendTags: ["balanced-comfort", "global-flavor"], difficulty: "Easy", time: 12, serve: "Works over rice or on its own.", steps: ["Cut tomato into large pieces and whisk eggs.", "Cook tomato first.", "Add eggs and fold gently.", "Finish with spring onion if available."] },
  { id: "yogurt-fruit-bowl", name: "Yogurt Fruit Bowl", description: "A light breakfast option with a wellness-friendly profile.", required: ["yogurt", "banana"], optional: ["apple", "avocado"], mealSlots: ["breakfast", "late"], trendTags: ["blood-sugar", "balanced-comfort", "brunch-cafe"], difficulty: "Easy", time: 5, serve: "Add nuts or honey if you keep them around.", steps: ["Spoon yogurt into a bowl.", "Top with banana and apple.", "Add avocado for more fullness if you want.", "Serve cold right away."] },
  { id: "kimchi-mushroom-omelet", name: "Kimchi Mushroom Omelet", description: "A strong use-up recipe for eggs, kimchi, and mushrooms.", required: ["egg", "kimchi", "mushroom"], optional: ["cheese", "springOnion"], mealSlots: ["breakfast", "lunch"], trendTags: ["protein-forward", "global-flavor"], difficulty: "Easy", time: 13, serve: "Cheese helps round out the flavor.", steps: ["Cook chopped kimchi and mushroom first.", "Pour in beaten eggs.", "Fold with cheese if you have it.", "Finish with spring onion."] },
  { id: "gochujang-cream-mushroom", name: "Spicy Cream Mushroom Base", description: "A trendy fusion direction that uses milk, onion, and mushrooms well.", required: ["milk", "onion", "mushroom"], optional: ["bacon", "cheese"], mealSlots: ["lunch", "dinner"], trendTags: ["global-flavor", "balanced-comfort"], difficulty: "Medium", time: 20, serve: "Works with pasta, udon, or toasted bread.", steps: ["Cook onion, mushroom, and bacon if available.", "Add milk and a little heat.", "Stir in cheese for body.", "Serve as a sauce base with any carb you have."] },
  { id: "chicken-lettuce-wrap", name: "Chicken Lettuce Wrap", description: "A lunch-friendly option with strong protein and fresh crunch.", required: ["chicken", "lettuce"], optional: ["tomato", "cheese", "tortilla", "yogurt"], mealSlots: ["lunch", "dinner"], trendTags: ["protein-forward", "portable-fresh"], difficulty: "Easy", time: 15, serve: "Use tortilla if you want a tighter wrap.", steps: ["Cook seasoned chicken fully.", "Wash lettuce and slice tomato.", "Use yogurt as a quick sauce if you want.", "Wrap and serve immediately."] },
  { id: "beef-veg-bowl", name: "Beef Vegetable Bowl", description: "A warm dinner choice when you want something filling.", required: ["beef", "onion", "carrot"], optional: ["mushroom", "egg", "springOnion"], mealSlots: ["lunch", "dinner"], trendTags: ["protein-forward", "balanced-comfort"], difficulty: "Medium", time: 18, serve: "Best with rice if you have some ready.", steps: ["Slice onion and carrot thin.", "Cook beef and vegetables together.", "Add mushroom or egg for a fuller bowl.", "Finish with spring onion."] },
  { id: "mushroom-potato-soup", name: "Mushroom Potato Milk Soup", description: "Soft, warm, and easy to eat later in the day.", required: ["mushroom", "potato", "milk"], optional: ["onion", "cheese"], mealSlots: ["dinner", "late"], trendTags: ["balanced-comfort", "blood-sugar"], difficulty: "Easy", time: 20, serve: "Mash the potato for body if you do not blend soup.", steps: ["Cook onion and mushroom first.", "Add potato with milk and a little water.", "Simmer until soft and mash lightly.", "Finish with cheese and pepper if available."] },
  { id: "kimchi-egg-fried-rice", name: "Kimchi Egg Fried Rice", description: "A classic fast meal that climbs when kimchi is close to its use date.", required: ["kimchi", "egg"], optional: ["springOnion", "bacon", "mushroom"], mealSlots: ["lunch", "dinner", "late"], trendTags: ["balanced-comfort"], difficulty: "Easy", time: 12, serve: "Great when you already have cold rice.", steps: ["Cook kimchi and spring onion first.", "Add bacon or mushroom if you have them.", "Stir in rice and finish with egg.", "Serve hot right away."] },
  { id: "tofu-cucumber-bowl", name: "Tofu Cucumber Bowl", description: "A clean, quick bowl for lunch or a lighter dinner.", required: ["tofu", "cucumber"], optional: ["avocado", "egg", "lettuce"], mealSlots: ["lunch", "dinner"], trendTags: ["protein-forward", "blood-sugar", "portable-fresh"], difficulty: "Easy", time: 10, serve: "Works like a rice bowl or a salad bowl.", steps: ["Pat tofu dry and use it cold or quickly seared.", "Slice cucumber and any extra greens.", "Add avocado or egg for more staying power.", "Dress lightly and serve."] },
  { id: "spinach-cheese-omelet", name: "Spinach Cheese Omelet", description: "A safe breakfast recommendation when greens need to go first.", required: ["egg", "spinach", "cheese"], optional: ["onion", "tomato"], mealSlots: ["breakfast", "lunch"], trendTags: ["protein-forward", "brunch-cafe"], difficulty: "Easy", time: 10, serve: "Tomato on the side adds brightness.", steps: ["Wilt the spinach briefly.", "Add eggs and cook gently.", "Fold in cheese near the end.", "Serve with tomato if available."] },
];

const QUICK_ADD_KEYS = ["egg", "milk", "tomato", "spinach", "kimchi", "tofu", "chicken", "mushroom", "yogurt", "cucumber"];

const SAMPLE_INGREDIENTS = [
  { name: "Egg", quantity: "4 ea" },
  { name: "Tomato", quantity: "3 ea" },
  { name: "Spinach", quantity: "1 bag" },
  { name: "Kimchi", quantity: "1 jar" },
  { name: "Mushroom", quantity: "1 pack" },
  { name: "Yogurt", quantity: "2 cup" },
  { name: "Chicken", quantity: "1 pack" },
];

const COLOR_TO_INGREDIENTS = {
  red: ["tomato", "kimchi", "bellpepper"],
  green: ["spinach", "lettuce", "cucumber", "broccoli"],
  yellow: ["egg", "cheese", "potato"],
  orange: ["carrot", "kimchi", "bellpepper"],
  white: ["milk", "tofu", "egg"],
  brown: ["mushroom", "onion", "potato", "bread"],
};

const aliasToKey = new Map();
const profileByKey = new Map();

for (const profile of INGREDIENT_LIBRARY) {
  profileByKey.set(profile.key, profile);
  for (const alias of profile.aliases) {
    aliasToKey.set(normalizeText(alias), profile.key);
  }
}

const dom = {
  heroClock: document.querySelector("#heroClock"),
  mealContextCopy: document.querySelector("#mealContextCopy"),
  photoInput: document.querySelector("#photoInput"),
  photoPreview: document.querySelector("#photoPreview"),
  photoPlaceholder: document.querySelector("#photoPlaceholder"),
  analyzePhotoButton: document.querySelector("#analyzePhotoButton"),
  analysisStatus: document.querySelector("#analysisStatus"),
  analysisResults: document.querySelector("#analysisResults"),
  analysisAction: document.querySelector("#analysisAction"),
  ingredientForm: document.querySelector("#ingredientForm"),
  ingredientSuggestions: document.querySelector("#ingredientSuggestions"),
  quickAddPills: document.querySelector("#quickAddPills"),
  inventorySummary: document.querySelector("#inventorySummary"),
  inventoryList: document.querySelector("#inventoryList"),
  insightTags: document.querySelector("#insightTags"),
  assistantNarrative: document.querySelector("#assistantNarrative"),
  discardZone: document.querySelector("#discardZone"),
  recommendationSummary: document.querySelector("#recommendationSummary"),
  recommendationList: document.querySelector("#recommendationList"),
  recipeDetail: document.querySelector("#recipeDetail"),
  loadSampleButton: document.querySelector("#loadSampleButton"),
  clearIngredientsButton: document.querySelector("#clearIngredientsButton"),
};

const runtime = {
  activePhotoFile: null,
  previewUrl: "",
  analysis: null,
};

let state = loadState();

initialize();

function initialize() {
  seedIfNeeded();
  renderSuggestionOptions();
  renderQuickAdds();
  bindEvents();
  refresh();
  window.setInterval(refreshClockOnly, 60_000);
}

function seedIfNeeded() {
  if (state.ingredients.length > 0) return;
  for (const item of SAMPLE_INGREDIENTS) {
    addIngredient({ name: item.name, quantity: item.quantity, source: "sample" });
  }
}

function bindEvents() {
  dom.photoInput.addEventListener("change", handlePhotoSelection);
  dom.analyzePhotoButton.addEventListener("click", handlePhotoAnalysis);
  dom.ingredientForm.addEventListener("submit", handleIngredientSubmit);
  dom.quickAddPills.addEventListener("click", handleQuickAddClick);
  dom.inventoryList.addEventListener("click", handleInventoryClick);
  dom.inventoryList.addEventListener("change", handleInventoryChange);
  dom.recommendationList.addEventListener("click", handleRecipeSelection);
  dom.analysisAction.addEventListener("click", handleAnalysisAction);
  dom.loadSampleButton.addEventListener("click", handleLoadSample);
  dom.clearIngredientsButton.addEventListener("click", handleClearAll);
}

function handleLoadSample() {
  state.ingredients = [];
  for (const item of SAMPLE_INGREDIENTS) {
    addIngredient({ name: item.name, quantity: item.quantity, source: "sample" });
  }
  runtime.analysis = null;
  renderAnalysisResults();
  refresh();
}

function handleClearAll() {
  state.ingredients = [];
  state.selectedRecipeId = "";
  refresh();
}

function handleQuickAddClick(event) {
  const button = event.target.closest("[data-key]");
  if (!button) return;
  const profile = profileByKey.get(button.dataset.key);
  addIngredient({ name: profile.label, quantity: `1 ${profile.unit}`, source: "quick" });
  refresh();
}

function handlePhotoSelection(event) {
  const file = event.target.files?.[0];
  runtime.activePhotoFile = file ?? null;
  runtime.analysis = null;
  renderAnalysisResults();

  if (runtime.previewUrl) {
    URL.revokeObjectURL(runtime.previewUrl);
    runtime.previewUrl = "";
  }

  if (!file) {
    dom.analyzePhotoButton.disabled = true;
    dom.photoPreview.hidden = true;
    dom.photoPlaceholder.hidden = false;
    dom.analysisStatus.textContent = "No photo selected yet.";
    return;
  }

  runtime.previewUrl = URL.createObjectURL(file);
  dom.photoPreview.src = runtime.previewUrl;
  dom.photoPreview.hidden = false;
  dom.photoPlaceholder.hidden = true;
  dom.analyzePhotoButton.disabled = false;
  dom.analysisStatus.textContent = "Photo ready. Run analysis to estimate ingredients.";
}

async function handlePhotoAnalysis() {
  if (!runtime.activePhotoFile) return;

  dom.analyzePhotoButton.disabled = true;
  dom.analysisStatus.textContent = "Reading filename clues and color balance...";

  try {
    runtime.analysis = await simulateVisionAnalysis(runtime.activePhotoFile);
    dom.analysisStatus.textContent = `${runtime.analysis.items.length} ingredient candidates found.`;
  } catch {
    runtime.analysis = null;
    dom.analysisStatus.textContent = "Image analysis failed. Please try another photo.";
  } finally {
    dom.analyzePhotoButton.disabled = false;
    renderAnalysisResults();
  }
}

function handleAnalysisAction(event) {
  const action = event.target.closest("[data-analysis-action]");
  if (!action || !runtime.analysis) return;

  if (action.dataset.analysisAction === "register") {
    for (const item of runtime.analysis.items) {
      addIngredient({ name: item.label, quantity: `1 ${getUnitForKey(item.key)}`, source: "photo", confidence: item.confidence });
    }
    dom.analysisStatus.textContent = "Photo results added to your fridge list.";
    refresh();
  }
}

function handleIngredientSubmit(event) {
  event.preventDefault();
  const formData = new FormData(dom.ingredientForm);
  const name = String(formData.get("ingredientName") || "").trim();
  const quantity = String(formData.get("ingredientQuantity") || "").trim();
  const customExpiry = String(formData.get("ingredientExpiry") || "").trim();
  if (!name) return;
  addIngredient({ name, quantity, customExpiry, source: "manual" });
  dom.ingredientForm.reset();
  refresh();
}

function handleInventoryClick(event) {
  const removeButton = event.target.closest("[data-remove-id]");
  if (!removeButton) return;
  state.ingredients = state.ingredients.filter((item) => item.id !== removeButton.dataset.removeId);
  refresh();
}

function handleInventoryChange(event) {
  const expiryInput = event.target.closest("[data-expiry-id]");
  if (!expiryInput) return;
  const ingredient = state.ingredients.find((item) => item.id === expiryInput.dataset.expiryId);
  if (!ingredient) return;
  ingredient.expiresAt = expiryInput.value;
  ingredient.source = ingredient.source === "manual" ? "manual" : "verified";
  refresh();
}

function handleRecipeSelection(event) {
  const button = event.target.closest("[data-recipe-id]");
  if (!button) return;
  state.selectedRecipeId = button.dataset.recipeId;
  saveState();
  renderRecommendations();
  renderRecipeDetail();
}

function refresh() {
  refreshClockOnly();
  saveState();
  renderInventory();
  renderInsights();
  renderRecommendations();
  renderRecipeDetail();
}

function refreshClockOnly() {
  const mealContext = getMealContext(new Date());
  state.mealContext = mealContext;
  dom.heroClock.textContent = formatClock(new Date());
  dom.mealContextCopy.textContent = `${mealContext.label}: ${mealContext.copy}`;
}

function renderSuggestionOptions() {
  dom.ingredientSuggestions.innerHTML = INGREDIENT_LIBRARY.map(
    (profile) => `<option value="${profile.label}"></option>`,
  ).join("");
}

function renderQuickAdds() {
  dom.quickAddPills.innerHTML = QUICK_ADD_KEYS.map((key) => {
    const profile = profileByKey.get(key);
    return `<button type="button" data-key="${profile.key}">${profile.label}</button>`;
  }).join("");
}

function renderAnalysisResults() {
  if (!runtime.analysis || runtime.analysis.items.length === 0) {
    dom.analysisResults.innerHTML = "";
    dom.analysisAction.innerHTML = "";
    return;
  }

  dom.analysisResults.innerHTML = runtime.analysis.items.map((item) => {
    const useBy = estimateExpiryDate(profileByKey.get(item.key));
    return `
      <article class="analysis-chip">
        <div class="recommendation-headline">
          <strong>${item.label}</strong>
          <span class="status-badge status-stable">${Math.round(item.confidence * 100)}%</span>
        </div>
        <span>${item.reason}</span>
        <small>Conservative use-by guess: ${formatDateLabel(useBy)}</small>
      </article>
    `;
  }).join("");

  dom.analysisAction.innerHTML = `
    <button class="primary-button" type="button" data-analysis-action="register">Add all to fridge</button>
    <button class="secondary-button" type="button" data-analysis-action="keep">Keep photo only</button>
  `;
}

function renderInventory() {
  const ingredients = [...state.ingredients].sort(sortIngredients);

  if (ingredients.length === 0) {
    dom.inventorySummary.textContent = "No ingredients yet.";
    dom.inventoryList.innerHTML = `<div class="empty-state">Add ingredients manually or run a photo scan.</div>`;
    return;
  }

  const urgentCount = ingredients.filter((item) => {
    const status = getIngredientStatus(item);
    return status.id === "urgent" || status.id === "soon";
  }).length;

  dom.inventorySummary.textContent = `${ingredients.length} items, ${urgentCount} expiring soon`;
  dom.inventoryList.innerHTML = ingredients.map((item) => {
    const status = getIngredientStatus(item);
    return `
      <article class="inventory-item">
        <div class="inventory-main">
          <div class="inventory-name-row">
            <strong>${item.name}</strong>
            <span class="status-badge status-${status.id} ${status.id === "urgent" ? "pulse" : ""}">
              ${status.label}
            </span>
          </div>
          <p class="inventory-meta">${item.quantity || `1 ${getUnitForKey(item.key)}`} · ${getSourceLabel(item.source)}</p>
          <p class="inventory-meta">Suggested use by ${formatDateLabel(item.expiresAt)}</p>
        </div>
        <div class="inventory-controls">
          <label>
            <span class="mini-label">Edit date</span>
            <input class="inventory-date" type="date" value="${item.expiresAt}" data-expiry-id="${item.id}" />
          </label>
        </div>
        <button class="remove-button" type="button" data-remove-id="${item.id}">Remove</button>
      </article>
    `;
  }).join("");
}

function renderInsights() {
  const mealContext = state.mealContext || getMealContext(new Date());
  const activeSignals = getActiveTrendSignals(mealContext);
  const allIngredients = state.ingredients;
  const safeIngredients = allIngredients.filter((item) => getIngredientStatus(item).id !== "expired");
  const urgentIngredients = safeIngredients.filter((item) => {
    const status = getIngredientStatus(item);
    return status.id === "urgent" || status.id === "soon";
  });
  const expiredIngredients = allIngredients.filter((item) => getIngredientStatus(item).id === "expired");

  dom.insightTags.innerHTML = [
    `<span class="signal-pill">${mealContext.label}</span>`,
    ...activeSignals.map((signal) => `<span class="signal-pill">${signal.label}</span>`),
  ].join("");

  if (safeIngredients.length === 0) {
    dom.assistantNarrative.innerHTML = `<div class="empty-state">There are no safe ingredients ready to use yet. Add a few items or scan a photo.</div>`;
  } else {
    const urgentNames = urgentIngredients.slice(0, 3).map((item) => item.name).join(", ");
    const urgentSentence = urgentIngredients.length > 0
      ? `The engine is prioritizing ${urgentNames} because they should be used soon.`
      : "Nothing looks critical yet, so meal timing and trend fit matter a bit more.";

    dom.assistantNarrative.innerHTML = `
      <p>
        Right now it is <strong>${mealContext.label.toLowerCase()}</strong>. ${urgentSentence}
        Current trend pressure favors <strong>${activeSignals[0].label}</strong> and <strong>${activeSignals[1].label}</strong>.
      </p>
    `;
  }

  if (expiredIngredients.length === 0) {
    dom.discardZone.innerHTML = "";
    return;
  }

  dom.discardZone.innerHTML = `
    <div class="discard-card">
      <h3>Review these first</h3>
      <ul class="discard-list">
        ${expiredIngredients.map((item) => `
          <li class="discard-item">
            <strong>${item.name}</strong>
            <p>The conservative use-by date passed on ${formatDateLabel(item.expiresAt)}. Check real condition before using.</p>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function renderRecommendations() {
  const recommendations = getRecipeCandidates();
  const ready = recommendations.filter((candidate) => candidate.missingRequired.length === 0);
  const shown = (ready.length > 0 ? ready : recommendations).slice(0, 5);

  if (shown.length === 0) {
    dom.recommendationSummary.textContent = "No strong recipe match yet.";
    dom.recommendationList.innerHTML = `<div class="empty-state">Add one protein and one vegetable to unlock much better recommendations.</div>`;
    return;
  }

  if (!shown.some((candidate) => candidate.recipe.id === state.selectedRecipeId)) {
    state.selectedRecipeId = shown[0].recipe.id;
  }

  dom.recommendationSummary.textContent = ready.length > 0
    ? `${ready.length} recipes are ready right now`
    : "These are the closest matches with one or two gaps.";

  dom.recommendationList.innerHTML = shown.map((candidate, index) => {
    const isActive = state.selectedRecipeId === candidate.recipe.id;
    const availability = candidate.missingRequired.length === 0
      ? "Ready now"
      : `${candidate.missingRequired.length} more ingredient(s) needed`;

    return `
      <button class="recommendation-item ${isActive ? "active" : ""}" type="button" data-recipe-id="${candidate.recipe.id}">
        <div class="recommendation-headline">
          <span class="recommendation-score">TOP ${index + 1}</span>
          <strong>${candidate.recipe.name}</strong>
          <span class="status-badge ${candidate.missingRequired.length === 0 ? "status-stable" : "status-soon"}">${availability}</span>
        </div>
        <p>${candidate.recipe.description}</p>
        <div class="recipe-pills">
          <span class="recipe-pill">Fit ${Math.round(candidate.score)}</span>
          <span class="recipe-pill">${candidate.recipe.time} min</span>
          <span class="recipe-pill">${candidate.recipe.difficulty}</span>
        </div>
        <div class="reason-pills">
          ${candidate.reasons.slice(0, 3).map((reason) => `<span class="reason-pill">${reason}</span>`).join("")}
        </div>
      </button>
    `;
  }).join("");
}

function renderRecipeDetail() {
  const candidates = getRecipeCandidates();
  const selected = candidates.find((candidate) => candidate.recipe.id === state.selectedRecipeId) || candidates[0];

  if (!selected) {
    dom.recipeDetail.innerHTML = `<div class="empty-state">Pick up a few ingredients and recipes will appear here.</div>`;
    return;
  }

  const mealContext = state.mealContext || getMealContext(new Date());
  const trendLabels = selected.recipe.trendTags.map((tag) => TREND_SIGNALS[tag]?.label).filter(Boolean);

  dom.recipeDetail.innerHTML = `
    <div class="recipe-panel">
      <header class="recipe-topline">
        <div class="recipe-subline">
          <span class="chip">${mealContext.label}</span>
          <span class="chip">Fit ${Math.round(selected.score)}</span>
          <span class="chip">${selected.recipe.time} min</span>
          <span class="chip">${selected.recipe.difficulty}</span>
        </div>
        <h3>${selected.recipe.name}</h3>
        <p>${selected.recipe.description}</p>
      </header>
      <div class="reason-pills">
        ${selected.reasons.map((reason) => `<span class="reason-pill">${reason}</span>`).join("")}
      </div>
      <div class="recipe-pills">
        ${trendLabels.map((label) => `<span class="recipe-pill">${label}</span>`).join("")}
      </div>
      <div class="recipe-grid">
        <section class="recipe-box">
          <h4>Required fridge items</h4>
          <ul class="recipe-ingredients">
            ${selected.recipe.required.map((key) => renderRecipeIngredientRow(key, selected)).join("")}
          </ul>
        </section>
        <section class="recipe-box">
          <h4>Steps</h4>
          <ol class="steps">
            ${selected.recipe.steps.map((step) => `<li>${step}</li>`).join("")}
          </ol>
        </section>
      </div>
      <section class="recipe-box">
        <h4>Why this is high on the list</h4>
        <p class="assistant-narrative">${selected.explanation} ${selected.recipe.serve}</p>
      </section>
    </div>
  `;
}

function renderRecipeIngredientRow(key, candidate) {
  const hit = candidate.availableKeys.includes(key);
  const label = profileByKey.get(key)?.label || key;
  return `
    <li class="recipe-ingredient">
      <span>${label}</span>
      <span class="ingredient-availability ${hit ? "ingredient-hit" : "ingredient-miss"}">${hit ? "In fridge" : "Need to add"}</span>
    </li>
  `;
}

function getRecipeCandidates() {
  const inventoryMap = buildInventoryMap();
  const safeKeys = [...inventoryMap.entries()]
    .filter(([, items]) => items.some((item) => getIngredientStatus(item).id !== "expired"))
    .map(([key]) => key);
  const safeKeySet = new Set(safeKeys);
  const urgencyMap = buildUrgencyMap(inventoryMap);
  const mealContext = state.mealContext || getMealContext(new Date());
  const activeSignalSet = new Set(getActiveTrendSignals(mealContext).map((signal) => signal.key));

  return RECIPES
    .map((recipe) => {
      const matchedRequired = recipe.required.filter((key) => safeKeySet.has(key));
      const missingRequired = recipe.required.filter((key) => !safeKeySet.has(key));
      const matchedOptional = recipe.optional.filter((key) => safeKeySet.has(key));
      const urgentMatches = [...matchedRequired, ...matchedOptional].filter((key) => (urgencyMap.get(key) || 0) >= 0.7);
      const requiredCoverage = matchedRequired.length / recipe.required.length;
      const optionalCoverage = recipe.optional.length ? matchedOptional.length / recipe.optional.length : 0;
      const timeFit = recipe.mealSlots.includes(mealContext.id) ? 1 : 0.45;
      const urgencyScore = urgentMatches.reduce((sum, key) => sum + (urgencyMap.get(key) || 0), 0);
      const trendScore = recipe.trendTags.reduce((sum, tag) => sum + (TREND_SIGNALS[tag]?.weight || 1), 0);
      const quickBonus = mealContext.id === "breakfast" || mealContext.id === "late"
        ? Math.max(0, 1 - recipe.time / 25)
        : Math.max(0, 1 - recipe.time / 40);
      const trendBonus = recipe.trendTags.some((tag) => activeSignalSet.has(tag)) ? 0.22 : 0.06;

      const score =
        requiredCoverage * 58 +
        optionalCoverage * 12 +
        urgencyScore * 10 +
        timeFit * 12 +
        trendScore * 4 +
        quickBonus * 8 +
        trendBonus * 14 -
        missingRequired.length * 18;

      const reasons = [];
      if (urgentMatches.length > 0) {
        reasons.push(`Use-soon items: ${urgentMatches.slice(0, 2).map((key) => profileByKey.get(key)?.label || key).join(", ")}`);
      }
      if (recipe.mealSlots.includes(mealContext.id)) {
        reasons.push(`Fits ${mealContext.label.toLowerCase()}`);
      }
      if (recipe.trendTags.length > 0) {
        reasons.push(recipe.trendTags.map((tag) => TREND_SIGNALS[tag]?.label).filter(Boolean).slice(0, 2).join(" + "));
      }
      if (missingRequired.length > 0) {
        reasons.push(`Missing: ${missingRequired.map((key) => profileByKey.get(key)?.label || key).join(", ")}`);
      }

      const explanationParts = [];
      if (urgentMatches.length > 0) {
        explanationParts.push(`It helps use ${urgentMatches.map((key) => profileByKey.get(key)?.label || key).join(", ")} before they get riskier.`);
      }
      explanationParts.push(`At ${mealContext.label.toLowerCase()}, recipes around ${recipe.time} minutes get a boost.`);
      if (recipe.trendTags.length > 0) {
        explanationParts.push(`This recipe also aligns with ${recipe.trendTags.map((tag) => TREND_SIGNALS[tag]?.label).filter(Boolean).join(", ")} signals.`);
      }
      if (missingRequired.length > 0) {
        explanationParts.push(`You would need ${missingRequired.map((key) => profileByKey.get(key)?.label || key).join(", ")} to fully complete it.`);
      }

      return {
        recipe,
        score,
        reasons,
        explanation: explanationParts.join(" "),
        missingRequired,
        availableKeys: matchedRequired,
      };
    })
    .filter((candidate) => candidate.availableKeys.length > 0)
    .sort((left, right) => right.score - left.score);
}

function buildInventoryMap() {
  const map = new Map();
  for (const ingredient of state.ingredients) {
    if (!map.has(ingredient.key)) {
      map.set(ingredient.key, []);
    }
    map.get(ingredient.key).push(ingredient);
  }
  return map;
}

function buildUrgencyMap(inventoryMap) {
  const urgencyMap = new Map();
  for (const [key, items] of inventoryMap.entries()) {
    let bestUrgency = 0;
    for (const item of items) {
      const status = getIngredientStatus(item);
      if (status.id === "expired") continue;
      if (status.id === "urgent") {
        bestUrgency = Math.max(bestUrgency, 1.2);
      } else if (status.id === "soon") {
        bestUrgency = Math.max(bestUrgency, 0.8);
      } else {
        bestUrgency = Math.max(bestUrgency, 0.35);
      }
    }
    urgencyMap.set(key, bestUrgency);
  }
  return urgencyMap;
}

function addIngredient({ name, quantity = "", customExpiry = "", source = "manual", confidence = 0.82 }) {
  const profile = resolveIngredientProfile(name);
  const normalizedQuantity = quantity || `1 ${profile.unit}`;
  const expiresAt = customExpiry || estimateExpiryDate(profile);
  const existing = state.ingredients.find((item) => item.key === profile.key);

  if (existing) {
    existing.quantity = mergeQuantities(existing.quantity, normalizedQuantity, profile.unit);
    existing.expiresAt = earlierDate(existing.expiresAt, expiresAt);
    existing.source = source;
    existing.confidence = Math.max(existing.confidence || 0, confidence);
    return existing;
  }

  const ingredient = {
    id: createId("ingredient"),
    key: profile.key,
    name: profile.label,
    quantity: normalizedQuantity,
    expiresAt,
    confidence,
    source,
    shelfLifeDays: profile.shelfLifeDays,
    safetyBufferDays: profile.safetyBufferDays,
  };

  state.ingredients.push(ingredient);
  return ingredient;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ingredients: [], selectedRecipeId: "", mealContext: getMealContext(new Date()) };
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.ingredients)) {
      throw new Error("Invalid state");
    }
    return {
      ingredients: parsed.ingredients,
      selectedRecipeId: parsed.selectedRecipeId || "",
      mealContext: getMealContext(new Date()),
    };
  } catch {
    return { ingredients: [], selectedRecipeId: "", mealContext: getMealContext(new Date()) };
  }
}

function saveState() {
  const serialized = JSON.stringify({
    ingredients: state.ingredients,
    selectedRecipeId: state.selectedRecipeId,
  });
  localStorage.setItem(STORAGE_KEY, serialized);
}

function resolveIngredientProfile(name) {
  const normalized = normalizeText(name);
  const exactKey = aliasToKey.get(normalized);
  if (exactKey) return profileByKey.get(exactKey);

  for (const profile of INGREDIENT_LIBRARY) {
    const matched = profile.aliases.some((alias) => {
      const aliasNorm = normalizeText(alias);
      return normalized.includes(aliasNorm) || aliasNorm.includes(normalized);
    });
    if (matched) return profile;
  }

  return {
    key: `custom-${normalized || createId("custom")}`,
    label: name,
    aliases: [name],
    shelfLifeDays: 4,
    safetyBufferDays: 1,
    unit: "ea",
  };
}

function getMealContext(date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return { id: "breakfast", label: "Breakfast", copy: "lighter, faster, and protein-friendly recipes get a lift" };
  if (hour >= 11 && hour < 16) return { id: "lunch", label: "Lunch", copy: "balanced and quick meals get a lift" };
  if (hour >= 16 && hour < 22) return { id: "dinner", label: "Dinner", copy: "warm and filling recipes get a lift" };
  return { id: "late", label: "Late bite", copy: "short and lighter recipes get a lift" };
}

function getActiveTrendSignals(mealContext) {
  const base = ["protein-forward", "global-flavor", "balanced-comfort"];
  if (mealContext.id === "breakfast") {
    base.unshift("brunch-cafe");
    base.push("blood-sugar");
  } else if (mealContext.id === "lunch") {
    base.push("portable-fresh");
  } else if (mealContext.id === "dinner") {
    base.push("blood-sugar");
  } else {
    base.unshift("blood-sugar");
  }
  return [...new Set(base)].map((key) => TREND_SIGNALS[key]);
}

async function simulateVisionAnalysis(file) {
  const filenameMatches = extractIngredientsFromFilename(file.name);
  const colorMatches = await extractIngredientsFromColors(file);
  const merged = new Map();

  for (const item of [...filenameMatches, ...colorMatches]) {
    const existing = merged.get(item.key);
    if (!existing || existing.confidence < item.confidence) {
      merged.set(item.key, item);
    }
  }

  const items = [...merged.values()].sort((a, b) => b.confidence - a.confidence).slice(0, 6);

  if (items.length > 0) return { items };

  return {
    items: [
      makeAnalysisItem("egg", 0.58, "Fallback guess from a generic fridge photo profile."),
      makeAnalysisItem("tomato", 0.54, "Fallback guess from general color balance."),
      makeAnalysisItem("lettuce", 0.52, "Fallback guess from common fresh produce mix."),
    ],
  };
}

function extractIngredientsFromFilename(filename) {
  const normalized = normalizeText(filename);
  const matches = [];
  for (const profile of INGREDIENT_LIBRARY) {
    const alias = profile.aliases.find((entry) => normalized.includes(normalizeText(entry)));
    if (alias) {
      matches.push(makeAnalysisItem(profile.key, 0.93, `Filename clue matched "${alias}".`));
    }
  }
  return matches;
}

async function extractIngredientsFromColors(file) {
  const palette = await sampleImagePalette(file);
  const total = Object.values(palette).reduce((sum, value) => sum + value, 0) || 1;
  const matches = [];

  for (const [color, count] of Object.entries(palette)) {
    const ratio = count / total;
    if (ratio < 0.12) continue;
    const candidates = COLOR_TO_INGREDIENTS[color] || [];
    const confidenceBase = Math.min(0.84, 0.42 + ratio);
    for (const key of candidates.slice(0, 2)) {
      matches.push(makeAnalysisItem(key, confidenceBase, `${capitalize(color)} tones are strong in the image.`));
    }
  }

  return matches;
}

function sampleImagePalette(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 28;
      canvas.height = 28;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
      const palette = { red: 0, orange: 0, yellow: 0, green: 0, white: 0, brown: 0 };

      for (let index = 0; index < data.length; index += 4) {
        const bucket = classifyPixel(data[index], data[index + 1], data[index + 2]);
        if (palette[bucket] !== undefined) {
          palette[bucket] += 1;
        }
      }

      URL.revokeObjectURL(url);
      resolve(palette);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image read failed"));
    };

    image.src = url;
  });
}

function classifyPixel(red, green, blue) {
  const { h, s, l } = rgbToHsl(red, green, blue);
  if (l > 0.82 && s < 0.18) return "white";
  if (l < 0.42 && h >= 12 && h <= 42) return "brown";
  if ((h >= 0 && h <= 15) || h >= 340) return "red";
  if (h > 15 && h <= 42) return "orange";
  if (h > 42 && h <= 72) return "yellow";
  if (h > 72 && h <= 165) return "green";
  return "brown";
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = 60 * (((g - b) / delta) % 6);
        break;
      case g:
        h = 60 * ((b - r) / delta + 2);
        break;
      default:
        h = 60 * ((r - g) / delta + 4);
        break;
    }
  }

  if (h < 0) h += 360;
  return { h, s, l };
}

function makeAnalysisItem(key, confidence, reason) {
  return {
    key,
    label: profileByKey.get(key)?.label || key,
    confidence,
    reason,
  };
}

function getIngredientStatus(item) {
  const daysLeft = daysBetween(startOfToday(new Date()), parseLocalDate(item.expiresAt));
  if (daysLeft < 0) return { id: "expired", label: "Past date" };
  if (daysLeft === 0) return { id: "urgent", label: "Use today" };
  if (daysLeft <= 2) return { id: "soon", label: `${daysLeft} day window` };
  return { id: "stable", label: `${daysLeft} days left` };
}

function estimateExpiryDate(profile) {
  const today = startOfToday(new Date());
  const conservativeWindow = Math.max(1, profile.shelfLifeDays - profile.safetyBufferDays);
  return formatDateInput(addDays(today, conservativeWindow));
}

function earlierDate(first, second) {
  return parseLocalDate(first) <= parseLocalDate(second) ? first : second;
}

function sortIngredients(left, right) {
  const order = { expired: 0, urgent: 1, soon: 2, stable: 3 };
  const statusDiff = order[getIngredientStatus(left).id] - order[getIngredientStatus(right).id];
  if (statusDiff !== 0) return statusDiff;
  return parseLocalDate(left.expiresAt) - parseLocalDate(right.expiresAt);
}

function getSourceLabel(source) {
  switch (source) {
    case "photo":
      return "Photo scan";
    case "sample":
      return "Sample";
    case "quick":
      return "Quick add";
    case "verified":
      return "Verified";
    default:
      return "AI estimate";
  }
}

function getUnitForKey(key) {
  return profileByKey.get(key)?.unit || "ea";
}

function mergeQuantities(first, second, fallbackUnit) {
  const firstParsed = parseQuantity(first);
  const secondParsed = parseQuantity(second);

  if (firstParsed && secondParsed) {
    const firstUnit = firstParsed.unit || fallbackUnit;
    const secondUnit = secondParsed.unit || fallbackUnit;
    if (firstUnit === secondUnit) {
      return `${trimNumber(firstParsed.value + secondParsed.value)} ${firstUnit}`;
    }
  }

  return first || second || `1 ${fallbackUnit}`;
}

function parseQuantity(value) {
  if (!value) return null;
  const match = value.match(/([\d.]+)/);
  if (!match) return null;
  return {
    value: Number(match[1]),
    unit: value.replace(match[1], "").trim(),
  };
}

function trimNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(1)));
}

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "");
}

function capitalize(value) {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}

function startOfToday(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateLabel(value) {
  const date = parseLocalDate(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function formatClock(date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function daysBetween(first, second) {
  const diff = second.getTime() - first.getTime();
  return Math.round(diff / 86_400_000);
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;
}
