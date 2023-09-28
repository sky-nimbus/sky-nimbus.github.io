//! ------------------------------------------------------------ PAGES

// Change tab colors when clicked
function openPage(pageName, elmnt) {
  var i, tabcontent, tablinks;
  tablinks = document.getElementsByClassName("tablink");
  tabcontent = document.getElementsByClassName("tabcontent");
  // Hide all tab content
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Reset all tab colors
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.color = "";
    tablinks[i].querySelector("img").style.filter = "";
  }
  // Color the clicked tab
  elmnt.style.color = "#282828";
  elmnt.querySelector("img").style.filter =
    "brightness(0) saturate(100%) hue-rotate(0deg) invert(5%)";
  // Show the click tab content
  document.getElementById(pageName).style.display = "block";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//! ------------------------------------------------------------ STYLIZER

var ssjInputBox;
var ssjOutputBox;
var ssjArray;
var sampleBox;
var samples = [];
var godInputBox;
var godOutputBox;
var frzInputBox;
var frzOutputBox;
var buuInputBox;
var buuOutputBox;
function ssjLoadCode() {
  ssjInputBox = document.getElementById("ssj_source_box");
  ssjOutputBox = document.getElementById("ssj_code_box");
  sampleBox = document.getElementById("ssj_sample_box");
  ssjChangeColorBoxes();
  godInputBox = document.getElementById("god_source_box");
  godOutputBox = document.getElementById("god_comment_box");
  frzInputBox = document.getElementById("frz_source_box");
  frzOutputBox = document.getElementById("frz_comment_box");
  buuInputBox = document.getElementById("buu_source_box");
  buuOutputBox = document.getElementById("buu_comment_box");
}
// Copy code in the code box
function ssjCopyCode() {
  ssjOutputBox.select();
  ssjOutputBox.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
// Source code from the source box
function ssjSourceCode() {
  let ssjSource = ssjInputBox.value.split("\n");
  ssjOutputBox.value = "";
  ssjOutputBox.value = ssjSource.join("\n");
  document.getElementById("ssj_code_box").style.color = "#808080";
  ssjEnableControls();
  ssjDisplayStats();
  sampleBox.value = samples;
} // Clear code from the code box
function ssjClearCode() {
  ssjInputBox.value = "";
  ssjOutputBox.value = "";
}
//? Enable or disable buttons
function ssjEnableControls() {
  let ssjArray = ssjOutputBox.value.split("\n");
  ssjMarkupCode(ssjArray);
  ssjEnableColors();
  ssjEnableParagraphs(ssjArray);
  ssjEnableLists();
  ssjEnableTables();
  ssjEnableAdvanced();
}
//! Display code stats
function ssjDisplayStats() {
  /*
  let ssjArray = ssjOutputBox.value.split("\n");
  ssjMarkupCode(ssjArray);
  // Record tags
  let ssjStatsTags = [];
  ssjStatsTags.push("Lines: " + ssjCode.Lines);
  ssjStatsTags.push("Paragraphs: " + ssjCode.Paragraphs.length);
  ssjStatsTags.push("Headings: " + ssjCode.Headings.length);
  ssjStatsTags.push("Lists: " + ssjCode.Lists.OpenTags.length);
  ssjStatsTags.push("Tables: " + ssjCode.Tables.OpenTags.length);
  ssjStatsTags.push("Accordions: " + ssjCode.Accordions.OpenTags.length);
  ssjStatsTags.push("Tabs: " + ssjCode.Tabs.OpenTags.length);
  ssjStatsTags.push("Divs: " + ssjCode.Divs.OpenTags.length);
  ssjStatsTags.push("Horizons: " + ssjCode.Horizons.length);
  ssjStatsTags.push("Images: " + ssjCode.Images);
  ssjStatsTags.push("Video/Audio: " + ssjCode.Media);
  // Record line and type
  let ssjStatsLines = [];
  let ssjStatsTypes = [];
  for (let i = 0; i < ssjArray.length; i++) {
    ssjMarkupLines(ssjArray, i);
    ssjStatsLines.push(i);
    ssjStatsTypes.push(ssjLine[i].Type);
  }
  // Display stats
  document.getElementById("ssj_stats_tags").innerHTML =
    ssjStatsTags.join("<br />");
  document.getElementById("ssj_stats_line").innerHTML =
    ssjStatsLines.join("<br />");
  document.getElementById("ssj_stats_type").innerHTML =
    ssjStatsTypes.join("<br />");
  */
}

//? ------------------------------ Controls

// Enable color controls
function ssjEnableColors() {
  if (ssjCode.Headings.length == 0 && ssjCode.Tables.OpenTags.length == 0) {
    document.getElementById("ssj_colors_drop").disabled = true;
    document.getElementById("ssj_colors_label").style.color = "#D3D3D3";
  } else {
    document.getElementById("ssj_colors_drop").disabled = false;
    document.getElementById("ssj_colors_label").style.color = "";
  }
}
// Enable paragraph controls
function ssjEnableParagraphs(array) {
  let p = document.querySelectorAll(".p_select");
  if (ssjCode.Lines == 1 && array[0] == "") {
    document.getElementById("ssj_paragraphs_button").disabled = true;
    for (let x = 0; x < p.length; x++) {
      p[x].disabled = true;
      p[x].style.color = "#D3D3D3";
    }
  } else {
    document.getElementById("ssj_paragraphs_button").disabled = false;
    for (let x = 0; x < p.length; x++) {
      p[x].disabled = false;
      p[x].style.color = "";
    }
  }
  ssjEnableHeadings();
  ssjEnableToC();
}
// Enable well heading controls
function ssjEnableHeadings() {
  let heading = document.querySelectorAll(".p_heading");
  if (ssjCode.Headings.length == 0) {
    document.getElementById("ssj_well_check").checked = false;
    for (let x = 0; x < heading.length; x++) {
      heading[x].disabled = true;
      heading[x].style.color = "#D3D3D3";
    }
    box_well.style.opacity = "0.3";
  } else {
    for (let x = 0; x < heading.length; x++) {
      heading[x].disabled = false;
      heading[x].style.color = "";
    }
    box_well.style.opacity = "1";
  }
}
// Enable table of content controls
function ssjEnableToC() {
  if (ssjCode.Headings.length < 2) {
    document.getElementById("ssj_toc_check").checked = false;
    document.getElementById("ssj_toc_check").disabled = true;
    document.getElementById("ssj_toc_label").style.color = "#D3D3D3";
    box_toc.style.opacity = "0.3";
  } else {
    document.getElementById("ssj_toc_check").disabled = false;
    document.getElementById("ssj_toc_label").style.color = "";
    box_toc.style.opacity = "1";
  }
}
// Enable list controls
function ssjEnableLists() {
  let list = document.querySelectorAll(".blt_select");
  let list_img = document.querySelectorAll(".blt_image");
  if (ssjCode.Lists.OpenTags.length == 0) {
    document.getElementById("ssj_lists_button").disabled = true;
    for (let x = 0; x < list.length; x++) {
      list[x].disabled = true;
      list[x].style.color = "#D3D3D3";
    }
  } else {
    document.getElementById("ssj_lists_button").disabled = false;
    document.getElementById("ssj_blt_periods_check").disabled = false;
    document.getElementById("ssj_blt_periods_label").style.color = "";
    if (ssjCode.Lists.Images == 0) {
      for (let x = 0; x < list_img.length; x++) {
        list_img[x].disabled = true;
        list_img[x].style.color = "#D3D3D3";
      }
    } else {
      for (let x = 0; x < list_img.length; x++) {
        list_img[x].disabled = false;
        list_img[x].style.color = "";
      }
    }
  }
}
// Enable table controls
function ssjEnableTables() {
  let table = document.querySelectorAll(".tbl_select");
  if (ssjCode.Tables.OpenTags.length == 0) {
    document.getElementById("ssj_tables_button").disabled = true;
    for (let x = 0; x < table.length; x++) {
      table[x].disabled = true;
      table[x].style.color = "#D3D3D3";
    }
    box_table.style.opacity = "0.3";
  } else {
    document.getElementById("ssj_tables_button").disabled = false;
    for (let x = 0; x < table.length; x++) {
      table[x].disabled = false;
      table[x].style.color = "";
    }
    box_table.style.opacity = "1";
  }
}
// Enable advanced controls
function ssjEnableAdvanced() {
  let adv = document.querySelectorAll(".adv_select");
  let check = 0;
  for (let x = 0; x < adv.length; x++) {
    if (adv[x].checked == true) {
      check += 1;
    }
  }
  if (check == 0) {
    document.getElementById("ssj_advance_button").disabled = true;
  } else {
    document.getElementById("ssj_advance_button").disabled = false;
  }
}

//* --------------------------------------------- Themes

const ssjThemes = {
  MoonRabbit: {
    ToC: ["#8F8F8F", "white"],
    Well: ["#F3F3F3", null],
    Table: ["#3D3D3D", "white"],
    Col: ["#F3F3F3", null],
  },
  CherryBlossom: {
    ToC: ["#E15170", "white"],
    Well: ["#FCEEF1", "#AA2242"],
    Table: ["#AA2242", "white"],
    Col: ["#FCEEF1", null],
  },
  CheeseBread: {
    ToC: ["#F0B719", "white"],
    Well: ["#FEF9EC", "#DF8301"],
    Table: ["#F48F01", "white"],
    Col: ["#FEF9EC", null],
  },
  HydroSoda: {
    ToC: ["#4A93D3", "white"],
    Well: ["#EFF5FB", "#2C75B5"],
    Table: ["#2C75B5", "white"],
    Col: ["#EFF5FB", null],
  },
  MochaIceCream: {
    ToC: ["#D19061", "white"],
    Well: ["#FAF4EF", "#8F623D"],
    Table: ["#8F623D", "white"],
    Col: ["#FAF4EF", null],
  },
  ForestKingdom: {
    ToC: ["#74A861", "white"],
    Well: ["#F3F8F2", "#067A00"],
    Table: ["#067A00", "white"],
    Col: ["#F3F8F2", null],
  },
  SweetPotatoFarm: {
    ToC: ["#AA74A1", "white"],
    Well: ["#F7F2F6", "#8F3D75"],
    Table: ["#8F3D75", "white"],
    Col: ["#F7F2F6", null],
  },
};
const ssjChosenTheme = {
  Theme: {},
  Values: {},
};
//? Assign the color theme
function ssjGetColorTheme() {
  switch (document.getElementById("ssj_colors_drop").value) {
    case "Moon Rabbit":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.MoonRabbit);
      break;
    case "Cherry Blossom":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.CherryBlossom);
      break;
    case "Cheese Bread":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.CheeseBread);
      break;
    case "Hydro Soda":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.HydroSoda);
      break;
    case "Mocha Ice Cream":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.MochaIceCream);
      break;
    case "Forest Kingdom":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.ForestKingdom);
      break;
    case "Sweet Potato Farm":
      Object.assign(ssjChosenTheme.Theme, ssjThemes.SweetPotatoFarm);
      break;
  }
}
// Store the syntax for theme colors
function ssjStoreTheme() {
  // Table of Contents
  let toc = [`background-color: ${ssjChosenTheme.Theme.ToC[0]};`];
  if (ssjChosenTheme.Theme.ToC[1] != null) {
    toc.push(`color: ${ssjChosenTheme.Theme.ToC[1]};`);
  }
  ssjChosenTheme.Values.ToC = toc.join(" ");
  // Heading Well
  let well = [`background-color: ${ssjChosenTheme.Theme.Well[0]};`];
  if (ssjChosenTheme.Theme.Well[1] != null) {
    well.push(`color: ${ssjChosenTheme.Theme.Well[1]};`);
  }
  ssjChosenTheme.Values.Well = well.join(" ");
  // Table Header
  let table = [`background-color: ${ssjChosenTheme.Theme.Table[0]};`];
  if (ssjChosenTheme.Theme.Table[1] != null) {
    table.push(`color: ${ssjChosenTheme.Theme.Table[1]};`);
  }
  ssjChosenTheme.Values.Table = table.join(" ");
  // Table Column
  let col = [`background-color: ${ssjChosenTheme.Theme.Col[0]};`];
  if (ssjChosenTheme.Theme.Col[1] != null) {
    col.push(`color: ${ssjChosenTheme.Theme.Col[1]};`);
  }
  ssjChosenTheme.Values.Col = col.join(" ");
}
var box_toc = document.getElementById("ssj_colorbox_toc");
var box_well = document.getElementById("ssj_colorbox_well");
var box_table = document.getElementById("ssj_colorbox_table");
// Change the color boxes
function ssjChangeColorBoxes() {
  ssjGetColorTheme();
  box_toc.style.background = ssjChosenTheme.Theme.ToC[0];
  box_well.style.background = ssjChosenTheme.Theme.Well[0];
  box_table.style.background = ssjChosenTheme.Theme.Table[0];
}
// Define Bootstrap attributes
var ssjBootstrap;
function ssjGetBootstraps() {
  ssjBootstrap = [];
  if (ssj_tbl_bordered_check.checked) {
    ssjBootstrap.push(" table-bordered");
  }
  if (ssj_tbl_condensed_check.checked) {
    ssjBootstrap.push(" table-condensed");
  }
  if (ssj_tbl_striped_check.checked) {
    ssjBootstrap.push(" table-striped");
  }
  if (ssj_tbl_hover_check.checked) {
    ssjBootstrap.push(" table-hover");
  }
}

//! ------------------------------------------------------------ Useful Functions

// Map an opening block tag to its closing tag
var ssjCloseBlock;
function ssjMapBlockTag(array, start, opentag, closetag) {
  ssjCloseBlock = 0;
  let inspector;
  for (let i = start; i < array.length; i++) {
    if (array[i].match(opentag)) {
      ssjCloseBlock += 1;
    }
    if (array[i].match(closetag)) {
      ssjCloseBlock -= 1;
      if (ssjCloseBlock == 0) {
        ssjCloseBlock = i;
        inspector = "done";
        return;
      }
    }
  }
  if (inspector != "done") {
    ssjCloseBlock = -1;
  }
}
// Map an opening inline tag to its closing tag
var ssjCloseInline;
function ssjMapInlineTag(line, start, tag) {
  ssjCloseInline = 0;
  let inspector = "search";
  let x = line.indexOf(tag, start);
  while (x != -1) {
    if (line[x - 1] == "<") {
      ssjCloseInline += 1;
    } else if (line[x - 1] == "/") {
      ssjCloseInline -= 1;
    }
    if (ssjCloseInline == 0) {
      ssjCloseInline = x - 2;
      inspector = "found";
      return;
    }
    x = line.indexOf(tag, x + 1);
  }
  if (inspector != "found") {
    ssjCloseInline = null;
  }
}
// Map a closing inline tag to its opening tag
var ssjOpenInline;
function ssjReverseInlineTag(line, start, tag) {
  ssjOpenInline = 0;
  let inspector = "search";
  let x = line.lastIndexOf(tag, start);
  while (x != -1) {
    if (line[x - 1] == "/") {
      ssjOpenInline -= 1;
    } else if (line[x - 1] == "<") {
      ssjOpenInline += 1;
    }
    if (ssjOpenInline == 0) {
      ssjOpenInline = x - 1;
      inspector = "found";
      return;
    }
    x = line.lastIndexOf(tag, x - 1);
  }
  if (inspector != "found") {
    ssjOpenInline = null;
  }
}
// Locate all indexes of a tag type
var ssjTagIndexes;
function ssjFindTags(array, i, tag) {
  ssjTagIndexes = [];
  let j = array[i].indexOf(tag);
  while (j != -1) {
    ssjTagIndexes.push(j);
    j = array[i].indexOf(tag, j + 1);
  }
}
// Rebuild a tag attribute given a nearby index
var ssjTagAttributes = [];
function ssjRescueAttr(array, i, index, tag, attr, value) {
  let attr_i = array[i].indexOf(attr + "=", index);
  let tag_i = array[i].lastIndexOf(tag, attr_i);
  if (attr_i != -1) {
    if (
      array[i].lastIndexOf("<", attr_i) <= tag_i &&
      attr_i < array[i].indexOf(">", index)
    ) {
      if (value != undefined) {
        let value_o = array[i].indexOf(value + ":", attr_i);
        if (value_o != -1 && value_o < array[i].indexOf(">", attr_i)) {
          let value_x = array[i].indexOf(";", value_o) + 1;
          let value_name = array[i].slice(value_o, value_x);
          ssjTagAttributes.push(attr + '="' + value_name + '"');
        }
      } else {
        let value_o = array[i].indexOf('"', attr_i) + 1;
        let value_x = array[i].indexOf('"', value_o);
        let value_name = array[i].slice(value_o, value_x);
        ssjTagAttributes.push(attr + '="' + value_name + '"');
      }
    }
  }
}
// Rescue a style value from an attribute
function ssjRescueValue(tag, value) {
  let style_o = tag.indexOf("style=");
  let style_x = tag.indexOf('"', style_o + 7);
  let style = tag.slice(style_o, style_x + 1);
  let value_o = style.indexOf(value + ":");
  if (value_o != -1) {
    let value_x = style.indexOf(";", value_o);
    return style.slice(value_o, value_x + 1);
  } else {
    return null;
  }
}
// Return only the text
function ssjGetText(array, i) {
  return array[i].replaceAll(/<[^>]*>/g, "").trim();
}
// Check for text or media
function ssjContentExists(array, i) {
  if (
    ssjGetText(array, i) != "" ||
    array[i].includes("<img") ||
    array[i].includes("<video") ||
    array[i].includes("<audio")
  ) {
    return true;
  } else {
    return false;
  }
}
// Check for media
function ssjMediaExists(array, i) {
  if (
    array[i].includes("<img") ||
    array[i].includes("<video") ||
    array[i].includes("<audio")
  ) {
    return true;
  } else {
    return false;
  }
}
// LOOP Check a range of lines for content
function ssjCheckRange(array, start, end) {
  let content = "";
  for (check = start; check < end; check++) {
    if (ssjContentExists(array, check)) {
      content = "found";
    }
  }
  if (content == "found") {
    return true;
  } else {
    return false;
  }
}
// Check if an ending string is a sentence
function ssjCheckSentence(array, i, string) {
  let start = array[i].lastIndexOf(string, array[i].length - 1);
  let textbefore = array[i].slice(0, start).replaceAll(/<[^>]*>/g, "");
  let twobefore = textbefore.slice(textbefore.length - 2, textbefore.length);
  if (
    (twobefore.match(/[\.\?!:;]\s/) || textbefore == "") &&
    array[i][start].match(/[A-Z]/)
  ) {
    return true;
  } else {
    return false;
  }
}
// Locate the first text after an index
var ssjFirstText;
function ssjFindText(array, i, index) {
  ssjFirstText = "";
  let j = index;
  while (j != -1 && j < array[i].length) {
    if (array[i][j] == "<") {
      j = array[i].indexOf(">", j) + 1;
    } else if (array[i][j] == ">") {
      j += 1;
    } else if (array[i][j] == " ") {
      j += 1;
    } else if (array[i][j].match(/[^<>\s]/)) {
      ssjFirstText = j;
      j = -1;
    }
  }
}
// Locate the last text before an index
var ssjLastText;
function ssjFindLastText(array, i, index) {
  ssjLastText = "";
  let j = index;
  while (j != -1) {
    if (array[i][j] == ">") {
      j = array[i].lastIndexOf("<", j) - 1;
    } else if (array[i][j] == "<") {
      j -= 1;
    } else if (array[i][j] == " ") {
      j -= 1;
    } else if (array[i][j].match(/[^<>\s]/)) {
      ssjLastText = j;
      j = -1;
    }
  }
}
// Locate the first media after an index
var ssjFirstMedia = [];
function ssjFindMedia(array, i, index) {
  ssjFirstMedia = [];
  let image = array[i].indexOf("<img", index);
  let video = array[i].indexOf("<video", index);
  let audio = array[i].indexOf("<audio", index);
  let media = [image, video, audio];
  let test = [];
  for (x = 0; x < media.length; x++) {
    if (media[x] != -1) {
      test.push(media[x]);
    }
  }
  if (test != []) {
    let min = Math.min(...test);
    if (min == image) {
      ssjFirstMedia.push("<img", image);
    } else if (min == video) {
      ssjFirstMedia.push("<video", video);
    } else if (min == audio) {
      ssjFirstMedia.push("<audio", audio);
    }
  } else {
    ssjFirstMedia = "";
  }
}
// Find the previous non-blank line
function ssjPrevLine(array, i) {
  let j = i;
  while (array[j] != null) {
    j -= 1;
    if (array[j] != "") {
      return j;
    }
  }
  if (j == -1) {
    return j;
  }
}
// Find the next non-blank line
function ssjNextLine(array, i) {
  let j = i;
  while (array[j] != null) {
    j += 1;
    if (array[j] != "") {
      return j;
    }
  }
  if (j == -1) {
    return j;
  }
}
// Skip the table of contents
var ssjSkip;
function ssjSkipToC(array) {
  let toc_o = array.indexOf(ssjCode.ToC.Div);
  let toc_x = 0;
  if (toc_o != -1) {
    toc_x = array.indexOf("</div>", toc_o) + 1;
  }
  ssjSkip = toc_x;
}
// Find the first index after a series of tags
var ssjLastTag;
var ssjAfterTags;
function ssjFindAfterTags(array, i, lasttext, tags) {
  ssjAfterTags = "";
  let inspector;
  let look = lasttext;
  while (inspector != "done") {
    inspector = "search";
    for (let x = 0; x < tags.length; x++) {
      if (array[i].indexOf(tags[x], look) == look + 1) {
        ssjLastTag = tags[x];
        look = look + tags[x].length;
        inspector = "continue";
      }
    }
    if (inspector == "search") {
      ssjAfterTags = look + 1;
      inspector = "done";
    }
  }
}
// Find the last index before a series of tags
var ssjBeforeTags;
function ssjFindBeforeTags(array, i, tags) {
  let inspector;
  let look = array[i].length - 1;
  while (inspector != "done") {
    inspector = "search";
    for (let x = 0; x < tags.length; x++) {
      if (array[i].lastIndexOf(tags[x], look) == -1) {
        inspector = "search";
      } else if (
        array[i].lastIndexOf(tags[x], look) == array[i].lastIndexOf("<", look)
      ) {
        look = array[i].lastIndexOf(tags[x], look);
        inspector = "continue";
      }
    }
    if (inspector == "search") {
      ssjBeforeTags = look;
      inspector = "done";
    }
  }
}
// Identify closing tags for stranded opening tags
var ssjStrandedTags_X;
function ssjFindStrandedTags_X(array, i, tags) {
  ssjStrandedTags_X = [];
  ssjFindTags(array, i, "<");
  for (x = 0; x < ssjTagIndexes.length; x++) {
    let tag_o = ssjTagIndexes[x];
    let tag_x = array[i].indexOf(">", tag_o);
    let tag = array[i].slice(tag_o, tag_x + 1);
    for (y = 0; y < tags.length; y++) {
      if (tag.startsWith("<" + tags[y])) {
        ssjMapInlineTag(array[i], tag_o, tags[y]);
        if (ssjCloseInline == null) {
          ssjStrandedTags_X.unshift("</" + tags[y] + ">");
        }
      }
    }
  }
}
// Identify opening tags for stranded closing tags
var ssjStrandedTags_O;
function ssjFindStrandedTags_O(array, i, tags) {
  ssjStrandedTags_O = [];
  ssjFindTags(array, i, "<");
  for (x = ssjTagIndexes.length - 1; x >= 0; x--) {
    let tag_o = ssjTagIndexes[x];
    let tag_x = array[i].indexOf(">", tag_o);
    let tag = array[i].slice(tag_o, tag_x + 1);
    for (y = 0; y < tags.length; y++) {
      if (tag.startsWith("</" + tags[y] + ">")) {
        ssjReverseInlineTag(array[i], tag_x, tags[y]);
        if (ssjOpenInline == null) {
          ssjStrandedTags_O.push("<" + tags[y] + ">");
        }
      }
    }
  }
}
// Add a period to the end
function ssjAddPeriods(array, i) {
  if (ssjContentExists(array, i) && !ssjCode.SkipZones.Code.includes(i)) {
    array[i] = array[i].replaceAll("<code", "<split><code");
    array[i] = array[i].replaceAll("</code>", "</code><split>");
    let dumb = array[i].split("<split>");
    for (sub = 0; sub < dumb.length; sub++) {
      if (dumb[sub].match(/<\/?code[^>]*>/g)) {
        dumb[sub] = dumb[sub].replaceAll("<br />", "<break>");
      }
    }
    array[i] = dumb.join("");
    let split = array[i].split("<br />");
    for (let x = 0; x < split.length; x++) {
      if (split[x].match(/[A-Za-z0-9]/g)) {
        ssjFindLastText(split, x, split[x].length - 1);
        if (!split[x].slice(ssjLastText).includes("</code>")) {
          if (!split[x].slice(ssjLastText).match(/[\.,\?!:;]/)) {
            let period = ssjLastText + 1;
            if (split[x][period] != null && split[x][period] == "<") {
              let nexttag = "inspect";
              while (nexttag != "done") {
                let closetag_o = period;
                let closetag_x = split[x].indexOf(">", closetag_o);
                let closetag = split[x].slice(closetag_o, closetag_x + 1);
                if (closetag.match(/(<\/strong>|<\/em>|<\/span>|<\/a>)/)) {
                  let tagname = closetag.slice(2, closetag.length - 1);
                  let opentag_o = split[x].lastIndexOf("<" + tagname, period);
                  let opentag_x = split[x].indexOf(">", opentag_o);
                  let string = split[x].slice(opentag_x + 1, period);
                  if (ssjCheckSentence(array, i, string)) {
                    nexttag = "done";
                  } else {
                    period = closetag_x + 1;
                    if (split[x][period] == null) {
                      nexttag = "done";
                    }
                  }
                } else {
                  nexttag = "done";
                }
              }
              split[x] =
                split[x].slice(0, period) + "." + split[x].slice(period);
            } else if (split[x][period] == null) {
              split[x] = split[x] + ".";
            }
          }
        }
      }
    }
    array[i] = split.join("<br />").replaceAll("<break>", "<br />");
  }
}

//! ------------------------------------------------------------ Code Functions

var ssjCode = {};
class ssjCodeClass {
  constructor() {
    this.Lines = 0;
    this.Paragraphs = [];
    this.Headings = [];
    this.ToC = {
      Titles: [],
      StyleForEach: [],
      StylesUsed: [],
      StylesChosen: [],
      Anchors: [],
      ListItems: [],
      Table: [],
      Div: '<div class="table of contents" style="width: fit-content; margin: 15px 0px;">',
    };
    this.Lists = {
      OpenTags: [],
      CloseTags: [],
      Images: 0,
    };
    this.Tables = {
      OpenTags: [],
      CloseTags: [],
    };
    this.Divs = {
      OpenTags: [],
      CloseTags: [],
    };
    this.Accordions = {
      OpenTags: [],
      CloseTags: [],
    };
    this.Tabs = {
      OpenTags: [],
      CloseTags: [],
    };
    this.Horizons = [];
    this.Images = 0;
    this.Media = 0;
    this.SkipZones = {
      Lists: [],
      Tables: [],
      Accordions: [],
      Tabs: [],
      Divs: [],
      Code: [],
    };
  }
}
//? Markup the code
function ssjMarkupCode(array) {
  ssjCode = new ssjCodeClass();
  ssjCode.Lines = array.length;
  ssjSkipToC(array);
  ssjMarkupAccordions(array, ssjSkip);
  ssjMarkupTabs(array, ssjSkip);
  ssjMarkupPre(array, ssjSkip);
  ssjMarkupBasics(array, ssjSkip);
  ssjMarkupLists(array, ssjSkip);
  ssjMarkupTables(array, ssjSkip);
  ssjMarkupDivs(array, ssjSkip);
}
//? Zero empty paragraphs from the top and bottom
function ssjZeroParagraphs(array) {
  let i = 0;
  while (i != -1 && array[i] != null) {
    if (
      array[i] == "<p></p>" ||
      array[i] == "<hr />" ||
      array[i] == "<br />" ||
      array[i].trim() == ""
    ) {
      array[i] = "";
      i += 1;
    } else {
      i = -1;
    }
  }
  let j = array.length - 1;
  while (j != -1 && array[j] != null) {
    if (
      array[j] == "<p></p>" ||
      array[j] == "<hr />" ||
      array[j] == "<br />" ||
      array[j].trim() == ""
    ) {
      array[j] = "";
      j -= 1;
    } else {
      j = -1;
    }
  }
}

//* --------------------------------------------- Code Markups

// Markup accordions
function ssjMarkupAccordions(array, start) {
  i = start;
  while (i < array.length) {
    if (
      array[i].includes("<!--Start acc set") ||
      array[i].match(/<div[^>]*class="panel[^>]*>/)
    ) {
      ssjCode.Accordions.OpenTags.push(i);
      ssjMapBlockTag(array, i, "<div", "</div>");
      ssjCode.Accordions.CloseTags.push(ssjCloseBlock);
      for (let mark = i; mark <= ssjCloseBlock; mark++) {
        ssjCode.SkipZones.Accordions.push(mark);
      }
      i = ssjCloseBlock;
    }
    i += 1;
  }
}
// Markup tabs
function ssjMarkupTabs(array, start) {
  i = start;
  while (i < array.length) {
    if (
      array[i].includes("<!--Start tab set") ||
      array[i].includes("<!--Start pill set")
    ) {
      ssjCode.Tabs.OpenTags.push(i);
      ssjMapBlockTag(array, i, "<div", "</div>");
      ssjCode.Tabs.CloseTags.push(ssjCloseBlock);
      for (let mark = i; mark <= ssjCloseBlock; mark++) {
        ssjCode.SkipZones.Tabs.push(mark);
      }
      i = ssjCloseBlock;
    }
    i += 1;
  }
}
// Markup preformatted text
function ssjMarkupPre(array, start) {
  for (let i = start; i < array.length; i++) {
    if (array[i].includes("<pre")) {
      ssjMapBlockTag(array, i, "<pre", "</pre>");
      for (let mark = i; mark <= ssjCloseBlock; mark++) {
        ssjCode.SkipZones.Code.push(mark);
      }
    }
    if (array[i].includes("<code")) {
      if (array[i].lastIndexOf("</code>") < array[i].lastIndexOf("<code")) {
        ssjMapBlockTag(array, i, "<code", "</code>");
        for (let mark = i + 1; mark < ssjCloseBlock; mark++) {
          ssjCode.SkipZones.Code.push(mark);
        }
      }
    }
  }
}
// Markup basic elements
function ssjMarkupBasics(array, start) {
  for (let i = start; i < array.length; i++) {
    if (array[i].match("<p>") || array[i].match(/<p [^>]*>/g)) {
      ssjCode.Paragraphs.push(i);
    }
    if (array[i].match(/<h[1-6][^>]*>/g)) {
      if (
        !ssjCode.SkipZones.Accordions.includes(i) &&
        !ssjCode.SkipZones.Tabs.includes(i)
      ) {
        ssjCode.Headings.push(i);
        ssjStoreHeadings(array, i);
      }
    }
    if (array[i].match("<hr />")) {
      ssjCode.Horizons.push(i);
    }
    if (array[i].match("<img")) {
      ssjFindTags(array, i, "<img");
      ssjCode.Images += ssjTagIndexes.length;
    }
    if (array[i].match("<video")) {
      ssjFindTags(array, i, "<video");
      ssjCode.Media += ssjTagIndexes.length;
    }
    if (array[i].match("<audio")) {
      ssjFindTags(array, i, "<audio");
      ssjCode.Media += ssjTagIndexes.length;
    }
    if (array[i].match("<li") && array[i].match("<img")) {
      ssjFindTags(array, i, "<img");
      ssjCode.Lists.Images += ssjTagIndexes.length;
    }
  }
}
// Markup lists
function ssjMarkupLists(array, start) {
  let i = start;
  while (i < array.length) {
    if (array[i].match(/<(ol|ul)[^>]*>/)) {
      ssjCode.Lists.OpenTags.push(i);
      let tag = array[i].match(/<(ol|ul)[^>]*>/)[0].slice(1, 3);
      ssjMapBlockTag(array, i, "<" + tag, "</" + tag + ">");
      ssjCode.Lists.CloseTags.push(ssjCloseBlock);
      for (let mark = i; mark <= ssjCloseBlock; mark++) {
        ssjCode.SkipZones.Lists.push(mark);
      }
      i = ssjCloseBlock;
    }
    i += 1;
  }
}
// Markup tables
function ssjMarkupTables(array, start) {
  let i = start;
  while (i < array.length) {
    if (array[i].match(/<table[^>]*>/)) {
      if (!ssjCode.Accordions.OpenTags.includes(i)) {
        ssjCode.Tables.OpenTags.push(i);
        ssjMapBlockTag(array, i, "<table", "</table>");
        ssjCode.Tables.CloseTags.push(ssjCloseBlock);
        let j = i;
        i = ssjCloseBlock;
        for (let look = j; look < ssjCloseBlock; look++) {
          look += 1;
          if (array[look].match(/<table[^>]*>/)) {
            ssjMapBlockTag(array, look, "<table", "</table>");
            for (let mark = look; mark <= ssjCloseBlock; mark++) {
              ssjCode.SkipZones.Tables.push(mark);
            }
          }
        }
      }
    }
    i += 1;
  }
}
// Markup divs
function ssjMarkupDivs(array, start) {
  for (let i = start; i < array.length; i++) {
    if (array[i].match(/<div[^>]*>/)) {
      ssjCode.Divs.OpenTags.push(i);
      ssjMapBlockTag(array, i, "<div", "</div>");
      ssjCode.Divs.CloseTags.push(ssjCloseBlock);
      if (
        ssjCode.SkipZones.Accordions.includes(i) ||
        ssjCode.SkipZones.Tabs.includes(i)
      ) {
        let tag = array[i].match(/<div[^>]*>/)[0];
        if (
          tag.includes("accordion") ||
          tag.includes("panel") ||
          tag.includes("collapse") ||
          tag.includes("list") ||
          tag.includes("form") ||
          tag.includes("row") ||
          tag.includes("col") ||
          tag.includes("container") ||
          tag.includes("tab")
        ) {
          ssjMapBlockTag(array, i, "<div", "</div>");
          ssjCode.SkipZones.Divs.push(i);
          ssjCode.SkipZones.Divs.push(ssjCloseBlock);
        }
      }
    }
  }
}

//? ------------------------------ Heading Storage

// Store the heading titles and styles used
function ssjStoreHeadings(array, i) {
  ssjCode.ToC.Titles.push(ssjGetText(array, i));
  let headtag_o = array[i].search(/<h[1-6]/);
  let style = array[i].slice(headtag_o + 2, headtag_o + 3);
  ssjCode.ToC.StyleForEach.push(style);
  if (!ssjCode.ToC.StylesUsed.includes(style)) {
    ssjCode.ToC.StylesUsed.push(style);
  }
  ssjCode.ToC.StylesUsed = ssjCode.ToC.StylesUsed.sort();
}

//! ------------------------------------------------------------ List Functions

var ssjInspector;
//? Run the list function
function ssjRunLists() {
  let ssjArray = ssjOutputBox.value.split("\n");
  // Run line cleanups
  ssjCleanupLists(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Run list cleanups
  let loop = 0;
  ssjInspector = "inspect";
  while (ssjInspector != "clean") {
    loop += 1;
    ssjInspector = "inspect";
    ssjLoopLists(ssjArray);
    ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
    ssjCheckLists(ssjArray);
    if (ssjInspector == "inspect") {
      ssjInspector = "clean";
    }
  }
  ssjFinishLists(ssjArray);
  ssjRemoveTrails(ssjArray);
  ssjZeroParagraphs(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Display the results in the code box
  ssjOutputBox.value = ssjArray.join("\n");
  document.getElementById("ssj_code_box").style.color = "#7A00CC";
  sampleBox.value = samples;
  ssjDisplayStats();
}

//* --------------------------------------------- List Mutations

//? Cleanup lists
function ssjCleanupLists(array) {
  ssjMarkupCode(array);
  ssjSkipToC(array);
  for (let i = ssjSkip; i < array.length; i++) {
    ssjMarkupLines(array, i);
    ssjMutateLines(array, i);
    ssjMutateLists(array, i);
  }
}
//? Loop mutations on lists
function ssjLoopLists(array) {
  ssjMarkupCode(array);
  ssjSkipToC(array);
  for (let i = ssjSkip; i < array.length; i++) {
    ssjMutateLoops(array, i);
    ssjRemoveBullets(array, i);
    ssjZeroDoublets(array, i);
    ssjZeroStacklets(array, i);
    ssjBreakListMedia(array, i);
    ssjConnectMediaItems(array, i);
    ssjConnectListItems(array, i);
    if (ssj_img_align_check.checked) {
      ssjAlignMedia(array, i);
    }
    ssjCompressBreaks(array, i);
    ssjZeroEmptyLists(array, i);
    ssjConvertSoloItems(array, i);
  }
}
//? Check lists
function ssjCheckLists(array) {
  ssjSkipToC(array);
  for (let i = ssjSkip; i < array.length; i++) {
    ssjCheckEmptyLists(array, i);
    ssjCheckDoubleStacks(array, i);
    ssjCheckMediaItems(array, i);
    ssjCheckSplitItems(array, i);
    ssjCheckAlignment(array, i);
    ssjCheckSolos(array, i);
  }
}
//? Finish lists
function ssjFinishLists(array) {
  ssjMarkupCode(array);
  ssjSkipToC(array);
  for (let i = ssjSkip; i < array.length; i++) {
    ssjAddListPeriods(array, i);
  }
}
//? Remove trailing breaks from the final list item
function ssjRemoveTrails(array) {
  ssjMarkupCode(array);
  for (let x = 0; x < ssjCode.Lists.CloseTags.length; x++) {
    let i = ssjCode.Lists.CloseTags[x];
    while (i != "listitem" && i > ssjCode.Lists.OpenTags[x]) {
      i -= 1;
      if (ssjContentExists(array, i)) {
        array[i] = array[i].replace(/(<br \/>)+<\/li>/, "</li>");
        i = "listitem";
      }
    }
  }
}

//? ------------------------------ List Cleanups

//? Mutate lists
function ssjMutateLists(array, i) {
  ssjMutateListTags(array, i);
  ssjReplaceListImg(array, i);
}
// Mutate list tags
function ssjMutateListTags(array, i) {
  let styles = [
    "lower-alpha",
    "lower-greek",
    "lower-roman",
    "upper-alpha",
    "upper-roman",
  ];
  ssjTagAttributes = [];
  if (array[i].match(/<ul[^>]*>/)) {
    let tag = array[i].match(/<ul[^>]*>/)[0];
    if (styles.some((value) => array[i].includes(value))) {
      ssjRescueAttr(array, i, 0, "<ul", "style", "list-style-type");
      array[i] = array[i].replace(
        /<ul[^>]*>/,
        "<ul " + ssjTagAttributes[0] + ">"
      );
    } else if (!tag.includes('class="nav')) {
      array[i] = array[i].replace(/<ul[^>]*>/, "<ul>");
    }
  } else if (array[i].match(/<ol[^>]*>/)) {
    if (styles.some((value) => array[i].includes(value))) {
      ssjRescueAttr(array, i, 0, "<ol", "style", "list-style-type");
      array[i] = array[i].replace(
        /<ol[^>]*>/,
        "<ol " + ssjTagAttributes[0] + ">"
      );
    } else {
      array[i] = array[i].replace(/<ol[^>]*>/, "<ol>");
    }
  } else if (array[i].match(/<li[^>]*>/)) {
    let tag = array[i].match(/<li[^>]*>/)[0];
    if (tag.includes("list-style-type: none")) {
      array[i] = array[i].replace(
        /<li[^>]*>/,
        '<li style="list-style-type: none;">'
      );
    } else if (!tag.includes('class="nav')) {
      array[i] = array[i].replace(/<li[^>]*>/, "<li>");
    }
    array[i] = array[i].replaceAll("<p>", "");
    array[i] = array[i].replace(/<p [^>]*>/, "");
  }
  array[i] = array[i].replaceAll("</p></li>", "</li>");
}
// Replace image tags
function ssjReplaceListImg(array, i) {
  if (array[i].match(/<li[^>]*>/) || ssjCode.SkipZones.Lists.includes(i)) {
    let x = array[i].indexOf("<img");
    while (x != -1) {
      let img_o = x;
      let img_x = array[i].indexOf(">", img_o);
      let img = array[i].slice(img_o, img_x + 1);
      ssjTagAttributes = [];
      ssjRescueAttr(array, i, x, "<img", "src");
      if (!ssj_img_sizes_check.checked) {
        let dim = ["width", "height"];
        for (let d = 0; d < dim.length; d++) {
          if (img.includes(dim[d] + "=")) {
            ssjRescueAttr(array, i, x, "<img", dim[d]);
          } else if (img.includes("style=")) {
            let value = ssjRescueValue(img, dim[d]);
            if (value != null) {
              if (value.match(/\d+px/)) {
                let value_n = value.match(/\d+/)[0];
                if (value_n != 0) {
                  ssjTagAttributes.push(dim[d] + '="' + value_n + '"');
                }
              }
            }
          }
        }
      }
      if (ssj_img_borders_check.checked) {
        ssjTagAttributes.push('style="border: 1px solid black;" border="1"');
      }
      array[i] = array[i].replace(
        "<img ",
        "<dum " + ssjTagAttributes.join(" ") + "<junk"
      );
      x = array[i].indexOf("<img", x + 1);
    }
    array[i] = array[i].replaceAll("<dum", "<img");
    array[i] = array[i].replaceAll(/<junk[^>]*>/g, " />");
  }
}

//? ------------------------------ List Loops

// Remove ersatz bullet points
function ssjRemoveBullets(array, i) {
  if (array[i].match(/<li[^>]*>/)) {
    let tag = array[i].match(/<li[^>]*>/)[0];
    // 1 or 2 digit numbers
    array[i] = array[i].replace(/<li[^>]*>\s*\d{1,2}\s*[.)-:]\s*/, tag);
    // Uppercase or lowercase letters
    array[i] = array[i].replace(/<li[^>]*>\s*[A-Za-z][.)-:]\s*/, tag);
    // Bullet unicode
    array[i] = array[i].replace(
      /<li[^>]*>\s*[\u2022,\u2023,\u25E6,\u2043,\u2219]\s*/,
      tag
    );
    // Bullet HTML
    array[i] = array[i].replace(
      /<li[^>]*>\s*(\&bull;|\&middot;|\&centerdot;|\&compfn|\&sdot;)\s*/,
      tag
    );
    // Dashes
    array[i] = array[i].replace(/<li[^>]*>\s*-\s*/, tag);
  }
}
// LOOP Zero double-stepped lists
function ssjZeroDoublets(array, i) {
  if (array[i].startsWith("<ul") || array[i].startsWith("<ol")) {
    let tag = array[i].match(/<(ul|ol)[^>]*>/)[0].slice(1, 3);
    if (array[i + 2] != null && array[i + 2].startsWith("<" + tag)) {
      if (
        array[i + 1] == "<li>" ||
        array[i + 1] == '<li style="list-style-type: none;">'
      ) {
        ssjMapBlockTag(array, i, "<" + tag, "</" + tag + ">");
        let list_x = ssjCloseBlock;
        if (!ssjContentExists(array, list_x - 1)) {
          ssjMapBlockTag(array, i + 1, "<li", "</li>");
          let listitem_x = ssjCloseBlock;
          if (listitem_x == list_x - 1) {
            array[i] = "";
            array[i + 1] = "";
            array[list_x] = "";
            array[listitem_x] = "";
          }
        }
      }
    }
  }
}
// LOOP Zero same-stacked lists
function ssjZeroStacklets(array, i) {
  if (array[i + 1] != null) {
    if (array[i] == "</ol>" && array[i + 1].match(/<ol[^>]*>/)) {
      array[i] = "";
      array[i + 1] = "";
    }
    if (array[i] == "</ul>" && array[i + 1].match(/<ul[^>]*>/)) {
      array[i] = "";
      array[i + 1] = "";
    }
  }
}
// Add breaks around image and media tags
function ssjBreakListMedia(array, i) {
  if (array[i].match(/<li[^>]*>/)) {
    if (array[i].match(/<img[^>]*>/g)) {
      let images = array[i].match(/<img[^>]*>/g);
      for (let tag = 0; tag < images.length; tag++) {
        array[i] = array[i].replaceAll(
          images[tag],
          "<br /><br />" + images[tag] + "<br /><br />"
        );
      }
    }
    array[i] = array[i].replaceAll("<video", "<br /><br /><video");
    array[i] = array[i].replaceAll("</video>", "</video><br /><br />");
    array[i] = array[i].replaceAll("<audio", "<br /><br /><audio");
    array[i] = array[i].replaceAll("</audio>", "</audio><br /><br />");
    ssjCondenseBreaks(array, i);
  }
}
// LOOP Connect list items that begin with media
function ssjConnectMediaItems(array, i) {
  if (array[i].startsWith("<li") && array[i].endsWith("</li>")) {
    if (array[i + 1].startsWith("<li")) {
      ssjFindText(array, i + 1, 0);
      ssjFindMedia(array, i + 1, 0);
      if (ssjFirstMedia != "") {
        if (ssjFirstText == "" || ssjFirstMedia[1] < ssjFirstText) {
          array[i + 1] =
            array[i].replace("</li>", "") +
            "<br /><br />" +
            array[i + 1].slice(array[i].indexOf(">") + 1);
          array[i] = "";
          ssjCondenseBreaks(array, i + 1);
        }
      }
    }
  } else if (array[i].startsWith("<li")) {
    if (array[i + 1].match(/<(ol|ul)[^>]*>/)) {
      if (array[i + 2].startsWith("<li")) {
        ssjFindText(array, i + 2, 0);
        ssjFindMedia(array, i + 2, 0);
        if (ssjFirstMedia != "") {
          if (ssjFirstText == "" || ssjFirstMedia[1] < ssjFirstText) {
            ssjAlignMedia(array, i + 2);
          }
        }
      }
    }
  }
}
// LOOP Connect split list items
function ssjConnectListItems(array, i) {
  if (array[i + 1] != null) {
    if (array[i].endsWith("<br />") || !array[i].endsWith(">")) {
      if (array[i + 1].startsWith("<br />")) {
        array[i + 1] = array[i] + array[i + 1];
        array[i] = "";
      }
    }
    if (array[i].startsWith("<li") && array[i + 1] == "</li>") {
      array[i + 1] = array[i] + array[i + 1];
      array[i] = "";
    }
    if (array[i].startsWith("<li") && !array[i].endsWith("</li>")) {
      if (array[i + 1].includes("<p>")) {
        if (array[i] == "<li>") {
          array[i + 1] = array[i + 1].replaceAll(/<\/?p>/g, "");
          array[i + 1] = array[i] + array[i + 1];
          array[i] = "";
        } else {
          array[i + 1] = array[i + 1].replace("<p>", "<br /><br />");
          array[i + 1] = array[i + 1].replace("</p>", "");
          array[i + 1] = array[i] + array[i + 1];
          array[i] = "";
        }
        ssjReplaceListImg(array, i + 1);
      } else if (array[i + 1] == "</li>") {
        if (array[i].endsWith("<br />")) {
          ssjFindBeforeTags(array, i, ["<br />"]);
          array[i] = array[i].slice(0, ssjBeforeTags);
        }
        array[i + 1] = array[i] + array[i + 1];
        array[i] = "";
      } else if (array[i + 1].includes("<table")) {
        array[i] = array[i] + "<br /><br />";
      }
    }
  }
  ssjCondenseBreaks(array, i);
}
// LOOP Align media to the left
function ssjAlignMedia(array, i) {
  ssjFindMedia(array, i, 0);
  if (array[i].endsWith("</li>") && ssjFirstMedia != "") {
    if (array[i + 1] == "</ol>" || array[i + 1] == "</ul>") {
      if (array[i + 2] != null && array[i + 2] == "</li>") {
        let string_o = array[i].indexOf(ssjFirstMedia[0]);
        let string_x = array[i].indexOf("</li>");
        let string = array[i].slice(string_o, string_x);
        array[i] = array[i].replaceAll(string, "");
        array[i + 2] = "<br /><br />" + string + "</li>";
        let tags = ["strong", "em", "span", "code"];
        ssjFindStrandedTags_X(array, i, tags);
        array[i] = array[i].replace("</li>", ssjStrandedTags_X + "</li>");
        ssjFindStrandedTags_O(array, i, tags);
        array[i + 2] = ssjStrandedTags_O + array[i + 2];
      }
    }
  }
}
// LOOP Compress breaks for list items
function ssjCompressBreaks(array, i) {
  ssjCondenseBreaks(array, i);
  if (array[i].startsWith("<li") && array[i].endsWith("</li>")) {
    if (!ssjMediaExists(array, i) && ssjGetText(array, i) != "") {
      array[i] = array[i].replace("<br /><br /></li>", "</li>");
      array[i] = array[i].replace("<br /></li>", "</li>");
      array[i] = array[i].replace("<br /><br />", "<br />");
    }
  }
  if (
    array[i].startsWith("<br /><br />") &&
    array[i - 1] != null &&
    !array[i - 1].match("</table>")
  ) {
    array[i] = array[i].replace("<br /><br />", "<br />");
  }
  if (
    array[i].endsWith("<br /><br />") &&
    !array[i + 1] != null &&
    !array[i + 1].match(/<table[^>]*>/)
  ) {
    let img = array[i].lastIndexOf("<img");
    if (
      img == -1 ||
      array[i]
        .slice(img)
        .replaceAll(/<[^>]*>/g, "")
        .trim() != ""
    ) {
      array[i] = array[i].slice(0, array[i].length - 6);
    }
  }
}
// LOOP Zero empty lists
function ssjZeroEmptyLists(array, i) {
  if (array[i].match(/<ul[^>]*>/g)) {
    ssjMapBlockTag(array, i, "<ul", "</ul>");
    if (!ssjCheckRange(array, i, ssjCloseBlock)) {
      for (let list = i; list <= ssjCloseBlock; list++) {
        array[list] = "";
      }
    }
  } else if (array[i].match(/<ol[^>]*>/g)) {
    ssjMapBlockTag(array, i, "<ol", "</ol>");
    if (!ssjCheckRange(array, i, ssjCloseBlock)) {
      for (let list = i; list <= ssjCloseBlock; list++) {
        array[list] = "";
      }
    }
  } else if (array[i].startsWith("<li") && array[i].endsWith("</li>")) {
    if (!ssjContentExists(array, i)) {
      array[i] = "";
    }
  }
}
// LOOP Convert solo lists to bullists
function ssjConvertSoloItems(array, i) {
  if (array[i].match(/<li[^>]*>/)) {
    if (
      (array[i - 1].startsWith("<ol") && array[i + 1].startsWith("</ol")) ||
      (array[i - 1].startsWith("<ul") && array[i + 1].startsWith("</ul"))
    ) {
      array[i - 1] = "<ul>";
      array[i + 1] = "</ul>";
    }
  }
}

//? ------------------------------ Loop Checks

// Check for empty lists
function ssjCheckEmptyLists(array, i) {
  if (array[i].match(/<ul[^>]*>/g)) {
    ssjMapBlockTag(array, i, "<ul", "</ul>");
    if (!ssjCheckRange(array, i, ssjCloseBlock)) {
      ssjInspector = "found";
    }
  } else if (array[i].match(/<ol[^>]*>/g)) {
    ssjMapBlockTag(array, i, "<ol", "</ol>");
    if (!ssjCheckRange(array, i, ssjCloseBlock)) {
      ssjInspector = "found";
    }
  } else if (array[i].match(/<li[^>]*>\s*<\/li>/g)) {
    ssjInspector = "found";
  }
}
// Check for doublets and stacklets
function ssjCheckDoubleStacks(array, i) {
  if (array[i].startsWith("<ul") || array[i].startsWith("<ol")) {
    let tag = array[i].match(/<(ul|ol)[^>]*>/)[0].slice(1, 3);
    if (array[i + 2] != null && array[i + 2].startsWith("<" + tag)) {
      if (
        array[i + 1] == "<li>" ||
        array[i + 1] == '<li style="list-style-type: none;">'
      ) {
        let tag = array[i].match(/<(ul|ol)[^>]*>/)[0].slice(1, 3);
        ssjMapBlockTag(array, i, "<" + tag, "</" + tag + ">");
        let list_x = ssjCloseBlock;
        if (!ssjContentExists(array, list_x - 1)) {
          ssjMapBlockTag(array, i + 1, "<li", "</li>");
          let listitem_x = ssjCloseBlock;
          if (listitem_x == list_x - 1) {
            ssjInspector = "found";
          }
        }
      }
    }
  }
  if (array[i + 1] != null) {
    if (
      (array[i] == "</ol>" && array[i + 1].startsWith("<ol")) ||
      (array[i] == "</ul>" && array[i + 1].startsWith("<ul"))
    ) {
      ssjInspector = "found";
    }
  }
}
// Check for list items that begin with media
function ssjCheckMediaItems(array, i) {
  if (array[i].startsWith("<li") && array[i].endsWith("</li>")) {
    if (array[i + 1].startsWith("<li")) {
      ssjFindText(array, i + 1, 0);
      ssjFindMedia(array, i + 1, 0);
      if (ssjFirstMedia != "") {
        if (ssjFirstText == "" || ssjFirstMedia[1] < ssjFirstText) {
          ssjInspector = "found";
        }
      }
    }
  }
}
// Check for split list items
function ssjCheckSplitItems(array, i) {
  if (array[i + 1] != null) {
    if (array[i].endsWith("<br />") || !array[i].endsWith(">")) {
      if (array[i + 1].startsWith("<br />")) {
        ssjInspector = "found";
      }
    }
  }
}
// Check for media alignment
function ssjCheckAlignment(array, i) {
  if (ssj_img_align_check.checked) {
    ssjFindMedia(array, i, 0);
    if (array[i].endsWith("</li>") && ssjFirstMedia != "") {
      if (array[i + 1] == "</ol>" || array[i + 1] == "</ul>") {
        if (array[i + 2] != null && array[i + 2] == "</li>") {
          ssjInspector = "found";
        }
      }
    }
  }
}
// Check for solo lists
function ssjCheckSolos(array, i) {
  if (array[i].match(/<li[^>]*>/)) {
    if (
      (array[i - 1].startsWith("<ol") && array[i + 1].startsWith("</ol")) ||
      (array[i - 1].match(/<ul[^>]+>/) && array[i + 1].startsWith("</ul"))
    ) {
      ssjInspector = "found";
    }
  }
}

//? ------------------------------ List Finishes

// Add periods to list items
function ssjAddListPeriods(array, i) {
  if (ssj_blt_periods_check.checked) {
    if (array[i].startsWith("<li") || array[i].endsWith("</li>")) {
      ssjAddPeriods(array, i);
    }
  }
}

//! ------------------------------------------------------------ Table Functions

//? Run the tables function
function ssjRunTables() {
  let ssjArray = ssjOutputBox.value.split("\n");
  // Run line cleanups
  ssjCleanupLines(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Run table cleanups
  ssjMutateTables(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  ssjMutateHeader(ssjArray);
  ssjFinishTables(ssjArray);
  ssjZeroParagraphs(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Display the results in the code box
  ssjOutputBox.value = ssjArray.join("\n");
  document.getElementById("ssj_code_box").style.color = "#CC0085";
  sampleBox.value = samples;
  ssjDisplayStats();
}
//? Finish tables
function ssjFinishTables(array) {
  ssjMarkupCode(array);
  ssjSkipToC(array);
  for (let i = ssjSkip; i < array.length; i++) {
    if (
      !ssjCode.SkipZones.Accordions.includes(i) &&
      !ssjCode.SkipZones.Tabs.includes(i) &&
      !ssjCode.SkipZones.Code.includes(i)
    ) {
      ssjAddTablePeriods(array, i);
      array[i] = array[i].replace(
        "<table>",
        '<table class="table table-bordered">'
      );
    }
  }
}

//* --------------------------------------------- Table Mutations

//? Mutate table tags and contents
function ssjMutateTables(array) {
  ssjMarkupCode(array);
  ssjSkipToC(array);
  for (let i = ssjSkip; i < array.length; i++) {
    if (
      !ssjCode.SkipZones.Accordions.includes(i) &&
      !ssjCode.SkipZones.Tabs.includes(i) &&
      !ssjCode.SkipZones.Code.includes(i)
    ) {
      if (array[i].includes("<table")) {
        array[i] = "<table>";
      }
      if (!ssj_tbl_colors_check.checked) {
        if (array[i].match(/<\/?col[^>]*>/)) {
          array[i] = array[i].replaceAll(/<\/?col[^>]*>/g, "").trim();
        }
      }
      if (array[i].includes("<thead")) {
        array[i] = "<thead>";
      }
      if (array[i].includes("<tbody")) {
        array[i] = "<tbody>";
      }
      if (array[i].includes("<tr")) {
        ssjMutateRowTags(array, i);
        ssjMutateCellContents(array, i);
      }
      if (array[i].includes("<th") && !array[i].includes("<thead")) {
        ssjMutateCellTags(array, i, "<th");
      }
      if (array[i].includes("<td")) {
        ssjMutateCellTags(array, i, "<td");
      }
    }
  }
}
// Mutate row tags
function ssjMutateRowTags(array, i) {
  if (ssj_tbl_colors_check.checked) {
    ssjTagAttributes = [];
    ssjRescueAttr(array, i, 0, "<tr", "style", "background-color");
    if (ssjTagAttributes.length > 0) {
      array[i] = array[i].replace(
        /<tr[^>]*>/g,
        ["<tr", ssjTagAttributes[0]].join(" ") + ">"
      );
    } else {
      array[i] = array[i].replace(/<tr[^>]*>/g, "<tr>");
    }
  } else {
    array[i] = array[i].replace(/<tr[^>]*>/g, "<tr>");
  }
}
// Mutate cell contents
function ssjMutateCellContents(array, i) {
  ssjMapBlockTag(array, i, "<tr", "</tr");
  for (let cell = i; cell < ssjCloseBlock; cell++) {
    ssjShrinkHeadings(array, cell);
    ssjBreakTableMedia(array, cell);
    ssjBreakParagraphs(array, cell);
    ssjUnbreakCells(array, cell);
  }
}
// Mutate cell tags
function ssjMutateCellTags(array, i, tag) {
  ssjTagAttributes = [];
  if (ssj_tbl_colors_check.checked) {
    ssjRescueAttr(array, i, 0, tag, "style", "background-color");
  }
  ssjRescueAttr(array, i, 0, tag, "rowspan", null);
  ssjRescueAttr(array, i, 0, tag, "colspan", null);
  if (ssjTagAttributes != []) {
    ssjTagAttributes.unshift(tag);
    array[i] = array[i].replace(
      /<(th|td)[^>]*>/g,
      ssjTagAttributes.join(" ") + ">"
    );
  } else {
    array[i] = array[i].replace(/<(th|td)[^>]*>/g, tag + ">");
  }
}

//? ------------------------------ Cell Mutations

// Shrink headings
function ssjShrinkHeadings(array, i) {
  if (array[i].match(/<h[1-6][^>]*>/)) {
    if (!ssj_headings_check.checked) {
      array[i] = array[i].replaceAll(/<h[1-6][^>]*>/g, "<strong>");
      array[i] = array[i].replaceAll(/<\/h[1-6]>/g, "</strong>");
      array[i] = array[i].replaceAll(/<a [^>]*><\/a>/g, "");
      if (
        array[ssjNextLine(array, i)] != null &&
        array[ssjNextLine(array, i)] == "<hr />"
      ) {
        array[ssjNextLine(array, i)] = array[i];
        array[i] = "";
      }
    }
  }
}
// Add breaks around image and media tags
function ssjBreakTableMedia(array, i) {
  if (!array[i].match(/<li[^>]*>/)) {
    if (array[i].match(/<img[^>]*>/g)) {
      let images = array[i].match(/<img[^>]*>/g);
      for (let tag = 0; tag < images.length; tag++) {
        array[i] = array[i].replaceAll(
          images[tag],
          "<br />" + images[tag] + "<br />"
        );
      }
    }
    array[i] = array[i].replaceAll("<video", "<br /><video");
    array[i] = array[i].replaceAll("</video>", "</video><br />");
    array[i] = array[i].replaceAll("<audio", "<br /><audio");
    array[i] = array[i].replaceAll("</audio>", "</audio><br />");
  }
}
// Convert closing paragraph tags to line breaks
function ssjBreakParagraphs(array, i) {
  if (!array[i].match(/<li[^>]*>/)) {
    if (ssjContentExists(array, i)) {
      array[i] = array[i].replace("<p>", "");
      array[i] = array[i].replace(/<p [^>]*>/, "");
      array[i] = array[i].replace("</p>", "");
      if (array[ssjNextLine(array, i)].includes("<p")) {
        array[ssjNextLine(array, i)] = array[ssjNextLine(array, i)].replace(
          "<p>",
          "<br /><br />"
        );
        array[ssjNextLine(array, i)] = array[ssjNextLine(array, i)].replace(
          /<p [^>]*>/,
          "<br /><br />"
        );
        array[ssjNextLine(array, i)] = array[ssjNextLine(array, i)].replace(
          "</p>",
          ""
        );
        array[ssjNextLine(array, i)] = array[i] + array[ssjNextLine(array, i)];
        array[i] = "";
      }
      ssjCondenseBreaks(array, i);
      array[i] = array[i].replaceAll("<br /><br />", "<br />");
      if (ssj_tbl_double_check.checked) {
        array[i] = array[i].replaceAll("<br />", "<br /><br />");
      }
    } else if (array[i] == "<p></p>") {
      array[i] = "";
    }
  }
}
// Remove line breaks in table cells
function ssjUnbreakCells(array, i) {
  if (array[i].startsWith("<td") || array[i].startsWith("<th")) {
    let tag = array[i].match(/<(td|th)[^>]*>/)[0];
    array[i] = array[i].replace(/<(td|th)[^>]*>(<br \/>)+/, tag);
  }
  if (
    array[i].startsWith("<br />") &&
    array[ssjPrevLine(array, i)].match(/<(td|th)[^>]*>/)
  ) {
    let tag = array[ssjPrevLine(array, i)].match(/<(td|th)[^>]*>/)[0];
    if (array[ssjPrevLine(array, i)].trim() == tag) {
      array[i] = array[i].replace(/(<br \/>)+/, "");
    }
  }
  array[i] = array[i].replace(/(<br \/>)+<\/td>/, "</td>");
  array[i] = array[i].replace(/(<br \/>)+<\/th>/, "</th>");
  if (array[i + 1] != null && array[i + 1] == "</td>") {
    if (array[i].endsWith("<br /><br />")) {
      array[i] = array[i].slice(0, array[i].length - 12);
    } else if (array[i].endsWith("<br />")) {
      array[i] = array[i].slice(0, array[i].length - 6);
    }
  }
}

//? ------------------------------ Table Finishes

// Add periods in table cells
function ssjAddTablePeriods(array, i) {
  if (ssj_tbl_periods_check.checked) {
    if (array[i].match(/<tr[^>]*>/)) {
      let td = 0;
      ssjMapBlockTag(array, i, "<tr", "</tr");
      for (let cell = i; cell < ssjCloseBlock; cell++) {
        if (array[cell].match("<td")) {
          td += 1;
        }
        if (ssj_tbl_column_check.checked) {
          if (td > 1) {
            ssjAddPeriods(array, cell);
          }
        } else {
          if (td > 0) {
            ssjAddPeriods(array, cell);
          }
        }
      }
    }
  }
}

//* --------------------------------------------- Header Mutations

class ssjTableClass {
  constructor() {
    this.Table_O = null;
    this.Head_O = null;
    this.Body_O = null;
    this.FirstRow_O = null;
    this.FirstRow_X = null;
    this.Table_X = null;
    this.NewHead_O = null;
  }
}
//? Add or remove the header
function ssjMutateHeader(array) {
  ssjGetBootstraps();
  ssjMarkupCode(array);
  ssjSkipToC(array);
  let i = array.indexOf("<table>", ssjSkip);
  while (i != -1) {
    while (
      ssjCode.SkipZones.Tables.includes(i) ||
      ssjCode.SkipZones.Accordions.includes(i) ||
      ssjCode.SkipZones.Tabs.includes(i) ||
      ssjCode.SkipZones.Code.includes(i)
    ) {
      i = array.indexOf("<table>", i + 1);
      if (i == -1) {
        return;
      }
    }
    ssjTable = new ssjTableClass();
    ssjMapBlockTag(array, i, "<table", "</table");
    ssjTable.Table_O = array.indexOf("<table>", i);
    ssjTable.Head_O = array.indexOf("<thead>", i);
    ssjTable.Body_O = array.indexOf("<tbody>", i);
    ssjTable.FirstRow_X = array.indexOf("</tr>", i);
    ssjTable.Table_X = ssjCloseBlock;
    ssjFindFirstRow(array, i);
    if (ssj_tbl_header_check.checked) {
      ssjCreateHeader(array, i);
    } else {
      ssjRemoveHeader(array);
    }
    array[ssjTable.Table_O] =
      '<table style="width: fit-content;" class="table' +
      ssjBootstrap.join("") +
      '">';
    if (ssj_tbl_column_check.checked) {
      ssjColorColumn(array);
    }
    i = array.indexOf("<table>", ssjTable.Table_O + 1);
  }
}

//? ------------------------------ Header Row

// Find the index of the first row
function ssjFindFirstRow(array, i) {
  let firstrow_o = i;
  if (ssjTable.Head_O == -1 || ssjTable.Head_O > ssjTable.Body_O) {
    firstrow_o = ssjTable.Body_O;
  } else {
    firstrow_o = ssjTable.Head_O;
  }
  while (firstrow_o != "found") {
    firstrow_o += 1;
    if (array[firstrow_o].startsWith("<tr")) {
      ssjTable.FirstRow_O = firstrow_o;
      firstrow_o = "found";
    }
  }
}
// Create the header
function ssjCreateHeader(array, i) {
  ssjStoreTheme();
  // If a header doesn't already exist, then create one
  if (ssjTable.Head_O == -1 || ssjTable.Head_O > ssjTable.Body_O) {
    // Insert header tags
    array[ssjTable.Body_O] = "<thead>";
    array[ssjTable.FirstRow_X] = array[ssjTable.FirstRow_X] + "\n</thead>";
    array[ssjTable.FirstRow_X + 1] =
      "<tbody>\n" + array[ssjTable.FirstRow_X + 1];
    // Replace td tags in the header with th tags
    for (let td = ssjTable.FirstRow_O; td < ssjTable.FirstRow_X; td++) {
      array[td] = array[td].replace("<td", "<th");
      array[td] = array[td].replace("td>", "th>");
      array[td] = array[td].replace(/\.?<\/th>\.?/, "</th>");
    }
    // Replace th tags in the body with td
    for (let th = array[ssjTable.FirstRow_X + 1]; th < ssjTable.Table_X; th++) {
      array[th] = array[th].replace("<th", "<td");
      array[th] = array[th].replace("th>", "td>");
    }
  } else if (ssjTable.Head_O < ssjTable.Body_O) {
    // If a header exists and contains td tags, then change them to th
    for (let td = ssjTable.FirstRow_O; td < ssjTable.FirstRow_X; td++) {
      array[td] = array[td].replace("<td", "<th");
      array[td] = array[td].replace("td>", "th>");
      array[td] = array[td].replace(/\.?<\/th>\.?/, "</th>");
    }
  }
  let NewHead_O = array.indexOf("<thead>", i);
  array[NewHead_O] = array[NewHead_O].replace(
    "<thead>",
    `<thead style="${ssjChosenTheme.Values.Table}">`
  );
}
// Remove the header
function ssjRemoveHeader(array) {
  // If a header already exists, then remove it
  if (ssjTable.Head_O != -1 && ssjTable.Head_O < ssjTable.Body_O) {
    array[ssjTable.Head_O] = "<tbody>";
    array[ssjTable.FirstRow_X + 1] = "";
    array[ssjTable.FirstRow_X + 2] = "";
    for (let th = ssjTable.FirstRow_O + 1; th < ssjTable.FirstRow_X; th++) {
      array[th] = array[th].replace("<th", "<td");
      array[th] = array[th].replace("th>", "td>");
    }
  }
}

//? ------------------------------ Header Column

// Color the first column
function ssjColorColumn(array) {
  ssjStoreTheme();
  let colgroup = "";
  for (let i = ssjTable.Table_O; i < ssjTable.FirstRow_X; i++) {
    if (array[i].match(/<colgroup[^>]*>/)) {
      colgroup = "found";
      let colgroup_o = array[i].indexOf("<colgroup");
      let colgroup_x = array[i].indexOf(">", colgroup_o);
      let col_o = array[i].indexOf("<col", colgroup_x);
      if (col_o != -1) {
        ssjReviseInlineCol(array, i, col_o);
      } else if (array[i + 1].match("<col")) {
        ssjReviseBlockCol(array, i + 1);
      }
    }
  }
  if (colgroup != "found") {
    let col = "";
    for (let i = ssjTable.Table_O; i < ssjTable.FirstRow_X; i++) {
      if (array[i].match(/<col[^>]*>/)) {
        col = "found";
        let col_o = array[i].indexOf("<col");
        if (array[i].indexOf("<col", col_o + 1) != -1) {
          ssjReviseInlineCol(array, i, col_o);
        } else {
          ssjReviseBlockCol(array, i + 1);
        }
      }
    }
    if (col != "found") {
      array[ssjTable.Table_O] =
        array[ssjTable.Table_O] +
        "\n<colgroup>" +
        `\n<col style="${ssjChosenTheme.Values.Col}">` +
        "\n</colgroup>";
    }
  }
}
// Revise inline col tags
function ssjReviseInlineCol(array, i, col_o) {
  let col_x = array[i].indexOf(">", col_o);
  let col = array[i].slice(col_o, col_x + 1);
  if (col.match("span=")) {
    ssjReduceColSpan(array, i, col);
    array[i] =
      array[i].slice(0, col_o) +
      array[i]
        .slice(col_o)
        .replace("<col", `<col style="${ssjChosenTheme.Values.Col}"> <col`);
  } else {
    array[i] =
      array[i].slice(0, col_o) +
      array[i]
        .slice(col_o)
        .replace(/<col[^>]*>/, `<col style="${ssjChosenTheme.Values.Col}">`);
  }
}
// Revise block col tags
function ssjReviseBlockCol(array, i) {
  let col_o = array[i].indexOf("<col");
  let col_x = array[i].indexOf(">", col_o);
  let col = array[i].slice(col_o, col_x + 1);
  if (col.match("span=")) {
    ssjReduceColSpan(array, i, col);
    array[i] = `<col style="${ssjChosenTheme.Values.Col}">\n` + array[i];
  } else {
    array[i] = array[i].replace(
      /<col[^>]*>/,
      `<col style="${ssjChosenTheme.Values.Col}">`
    );
  }
}
// Reduce the col span attribute (first col tag only)
function ssjReduceColSpan(array, i, col) {
  let num_o = col.indexOf("span=") + 6;
  let num_x = col.indexOf('"', num_o);
  let newnum = col.slice(num_o, num_x) - 1;
  let newcol = col.slice(0, num_o) + newnum + col.slice(num_x);
  array[i] = array[i].replace(col, newcol).replace(' span="1"', "");
}

//! ------------------------------------------------------------ Paragraph Functions

//? Run the paragraphs function
function ssjRunParagraphs() {
  let ssjArray = ssjOutputBox.value.split("\n");
  // Remove the table of contents
  ssjRemoveToC(ssjArray);
  // Run line cleanups
  ssjCleanupLines(ssjArray);
  ssjZeroParagraphs(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Crunch empty paragraphs
  if (ssj_crunchy_check.checked) {
    ssjArray = ssjArray.filter(function (ssjArray) {
      return ssjArray != "<p></p>";
    });
  }
  // Run paragraph cleanups
  ssjCreateHeaderToC(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Display the results in the code box
  ssjOutputBox.value = ssjArray.join("\n");
  document.getElementById("ssj_code_box").style.color = "#0465DC";
  sampleBox.value = samples;
  ssjDisplayStats();
}
//? Remove the table of contents
function ssjRemoveToC(array) {
  let toc_o = array.indexOf(ssjCode.ToC.Div);
  if (toc_o != -1) {
    let toc_x = array.indexOf("</div>", toc_o);
    for (let i = toc_o; i <= toc_x; i++) {
      array[i] = "";
    }
    if (toc_x != -1 && array[toc_x + 1] == "<p></p>") {
      array[toc_x] = "";
    }
  }
}
//? Create new headings and a table of contents
function ssjCreateHeaderToC(array) {
  ssjMarkupCode(array);
  ssjMutateHeadings(array);
  ssjInsertToC(array);
}

//* --------------------------------------------- Headings

//? Mutate the headings
function ssjMutateHeadings(array) {
  for (let i = 0; i < array.length; i++) {
    if (!ssjCode.SkipZones.Code.includes(i)) {
      ssjMarkupLines(array, i);
      if (!ssj_headings_check.checked) {
        ssjChangeHeadings(array, i);
        ssjStylizeHeadings(array, i);
      }
      if (ssj_toc_check.checked && ssjCode.Headings.length > 1) {
        ssjStoreAnchors(array, i);
        ssjInsertAnchors(array, i);
      }
    }
  }
}
// Replace the heading styles
function ssjChangeHeadings(array, i) {
  /*if (ssj_well_check.checked) {
    ssjCode.ToC.StylesChosen = [2, 3, 4, 5, 6, 6];
  } else {
    ssjCode.ToC.StylesChosen = [3, 4, 5, 6, 6, 6];
  }*/
  ssjCode.ToC.StylesChosen = [3, 4, 5, 6, 6, 6];
  for (let style = 0; style < ssjCode.ToC.StylesUsed.length; style++) {
    if (array[i].match("<h" + ssjCode.ToC.StylesUsed[style])) {
      if (ssjCode.ToC.StylesUsed[style] != ssjCode.ToC.StylesChosen[style]) {
        array[i] = array[i].replace(
          /<h[1-6][^>]*>/,
          "<h" + ssjCode.ToC.StylesChosen[style] + ">"
        );
        array[i] = array[i].replace(
          /<\/h[1-6]>/,
          "</h" + ssjCode.ToC.StylesChosen[style] + ">"
        );
        break;
      }
    }
  }
}
// Stylize the headings
function ssjStylizeHeadings(array, i) {
  ssjStoreTheme();
  if (array[i].match(/<h3[^>]*>/)) {
    if (ssj_well_check.checked) {
      array[i] = array[i].replace(
        /<h3[^>]*>/,
        `<h3 class="well" style="${ssjChosenTheme.Values.Well} margin-top: 14px;" align="center">`
      );
      ssjRemoveHorizon(array, i);
    } else {
      array[i] = array[i].replace(/<h3[^>]*>/, "<h3>");
      ssjAddHorizon(array, i);
    }
    ssjAddSpaceAbove(array, i);
  } else if (array[i].match(/<h4[^>]*>/)) {
    array[i] = array[i].replace(
      /<h4[^>]*>/,
      '<h4 style="margin-bottom: 14px;">'
    );
    ssjAddSpaceAbove(array, i);
    ssjRemoveHorizon(array, i);
  } else if (array[i].match(/<h5[^>]*>/)) {
    array[i] = array[i].replace(
      /<h5[^>]*>/,
      '<h5 style="margin-bottom: 14px;"><em>'
    );
    array[i] = array[i].replace("</h5>", "</em></h5>");
    ssjAddSpaceAbove(array, i);
    ssjRemoveHorizon(array, i);
  }
}
// Add space above a heading
function ssjAddSpaceAbove(array, i) {
  if (ssjPrevLine(array, i) > -1) {
    if (
      !array[ssjPrevLine(array, i)].match("<p></p>") &&
      !array[ssjPrevLine(array, i)].match("<hr />") &&
      !array[ssjPrevLine(array, i)].match('class="well"')
    ) {
      array[i] = "<p></p>\n" + array[i];
    }
  }
}
// Add a horizontal rule below a heading
function ssjAddHorizon(array, i) {
  if (array[i + 1] != null && !array[i + 1].includes("<hr />")) {
    if (array[i + 1] == "<p></p>") {
      array[i + 1] = "<hr />";
    } else {
      array[i] = array[i] + "\n<hr />";
    }
  }
}
// Remove a horizontal rule below a heading
function ssjRemoveHorizon(array, i) {
  if (array[i + 1] != null && array[i + 1] == "<hr />") {
    array[i + 1] = "";
  }
}

//? ------------------------------ Anchors

// Store the heading anchors
function ssjStoreAnchors(array, i) {
  if (array[i].match(/<h[1-6][^>]*>/)) {
    let text = array[i]
      .replaceAll(/<[^>]*>/g, "")
      .trim()
      .replaceAll(/[^A-Za-z0-9]/g, " ")
      .trim()
      .replaceAll(/\s+/g, "-");
    if (text[0].match(/[0-9]/)) {
      text = "_" + text;
    }
    let mod = 1;
    let anchor = text;
    while (ssjCode.ToC.Anchors.includes(anchor)) {
      anchor = text + "-" + mod;
      mod += 1;
    }
    ssjCode.ToC.Anchors.push(anchor);
    ssjLine[i].HeadingAnchor = '<a id="' + anchor + '"></a>';
  }
}
// Insert the heading anchors
function ssjInsertAnchors(array, i) {
  if (array[i].match(/<h[1-6][^>]*>/)) {
    array[i] = array[i].replaceAll(/<\/?a[^>]*>/g, "");
    let headtag_o = array[i].indexOf("<h");
    let insert = array[i].indexOf(">", headtag_o) + 1;
    array[i] = [
      array[i].slice(0, insert),
      ssjLine[i].HeadingAnchor,
      array[i].slice(insert),
    ].join("");
  }
}

//* --------------------------------------------- Table of Contents

//? Add the table of contents
function ssjInsertToC(array) {
  if (ssj_toc_check.checked && ssjCode.Headings.length > 1) {
    ssjCreateListItems();
    ssjCreateNestedLists();
    ssjCreateTable();
    array.unshift(ssjCode.ToC.Table);
  }
}
// Create the list items
function ssjCreateListItems() {
  for (let x = 0; x < ssjCode.ToC.Titles.length; x++) {
    ssjCode.ToC.ListItems.push(
      '<li><a title="' +
        ssjCode.ToC.Titles[x] +
        '" href="#' +
        ssjCode.ToC.Anchors[x] +
        '">' +
        ssjCode.ToC.Titles[x] +
        "</a></li>"
    );
  }
}
// Create nested lists
function ssjCreateNestedLists() {
  let toc = ssjCode.ToC;
  for (let i = 0; i < toc.ListItems.length; i++) {
    for (let style = 0; style < toc.StylesUsed.length; style++) {
      if (toc.StyleForEach[i] > toc.StylesUsed[style]) {
        if (
          toc.StyleForEach[i + 1] == null ||
          toc.StyleForEach[i + 1] == toc.StylesUsed[style]
        ) {
          toc.ListItems[i] = toc.ListItems[i] + "\n</ul>\n</li>";
        }
        if (i > 0 && toc.StyleForEach[i - 1] == toc.StylesUsed[style]) {
          toc.ListItems[i - 1] = toc.ListItems[i - 1].replace("</li>", "");
          toc.ListItems[i - 1] =
            toc.ListItems[i - 1] + '\n<ul style="list-style-type: square;">';
        } else if (i == 0) {
          toc.ListItems[i] =
            '<li>\n<ul style="list-style-type: square;">\n' + toc.ListItems[i];
        }
      }
    }
  }
}
// Create the table of contents
function ssjCreateTable() {
  ssjStoreTheme();
  let table = [
    '<table style="width: fit-content;" class="table table-bordered">',
  ];
  let head = [
    `<thead style="${ssjChosenTheme.Values.ToC}">`,
    "<tr>",
    "<th>Contents</th>",
    "</tr>",
    "</thead>",
  ];
  let body = [
    "<tbody>",
    "<tr>",
    '<td style="padding: 10px 20px 12px 0px">',
    '<ul style="list-style-type: square;">',
  ];
  let foot = ["</ul>", "</td>", "</tr>", "</tbody>", "</table>", "</div>"];
  ssjCode.ToC.Table = [ssjCode.ToC.Div]
    .concat(table, head, body, ssjCode.ToC.ListItems, foot)
    .join("\n");
}

//! ------------------------------------------------------------ Line Functions

var ssjLine = [];
class ssjLineClass {
  constructor() {
    this.Type = [];
    this.Anchors = [];
    this.Spans = [];
    this.HeadingAnchor = "";
  }
}
//? Clean up each line
function ssjCleanupLines(array) {
  ssjMarkupCode(array);
  ssjSkipToC(array);
  for (i = ssjSkip; i < array.length; i++) {
    ssjMarkupLines(array, i);
    ssjMutateLines(array, i);
    if (!ssjCode.SkipZones.Code.includes(i)) {
      ssjMutateLoops(array, i);
    }
  }
}
//? Markup each line of code
function ssjMarkupLines(array, i) {
  ssjLine[i] = new ssjLineClass();
  ssjMarkupBasicTypes(array, i);
  ssjMarkupListTypes(array, i);
  ssjMarkupTableTypes(array, i);
  ssjMarkupDivTypes(array, i);
}
//? Mutate each line of code
function ssjMutateLines(array, i) {
  array[i] = array[i].replaceAll("<code", "<split><code");
  array[i] = array[i].replaceAll("</code>", "</code><split>");
  let split = array[i].split("<split>");
  for (sub = 0; sub < split.length; sub++) {
    if (
      !split[sub].match(/<\/?code[^>]*>/g) &&
      !ssjCode.SkipZones.Code.includes(i)
    ) {
      ssjConvertSpaces(split, sub);
      ssjCorrectSpellings(split, sub);
    }
  }
  array[i] = split.join("");
  if (!ssjCode.SkipZones.Divs.includes(i)) {
    ssjStripDivs(array, i);
  }
  if (
    !ssjCode.SkipZones.Accordions.includes(i) &&
    !ssjCode.SkipZones.Tabs.includes(i)
  ) {
    ssjRemoveComments(array, i);
  }
  ssjConvertPhrases(array, i);
  ssjAssembleTags(array, i);
  ssjReviseSpans(array, i);
  ssjReviseAnchors(array, i);
  ssjStripHeadings(array, i);
  ssjStripSpecials(array, i);
  ssjReplaceImg(array, i);
  array[i] = array[i].trim();
}
//? Loop mutations on each line of code
function ssjMutateLoops(array, i) {
  let inspector = "inspect";
  while (inspector != "clean") {
    inspector = "inspect";
    array[i] = array[i].replaceAll("<code", "<split><code");
    array[i] = array[i].replaceAll("</code>", "</code><split>");
    let split = array[i].split("<split>");
    for (sub = 0; sub < split.length; sub++) {
      if (
        !split[sub].match(/<\/?code[^>]*>/g) &&
        !ssjCode.SkipZones.Code.includes(i)
      ) {
        ssjConvertSpaces(split, sub);
        if (split[sub].match("  ")) {
          inspector = "found";
        }
      }
    }
    array[i] = split.join("");
    ssjCondenseBreaks(array, i);
    ssjShiftInline(array, i);
    ssjShiftMedia(array, i);
    ssjRemoveStyles(array, i);
    ssjTrimBlocks(array, i);
    ssjZeroEmptyLines(array, i);
    if (
      array[i].match(
        /(<strong>|<em>|<code[^>]*>|<span[^>]*>)(\s|<br \/>|<img[^>]*>|<video[^>]*>|<audio[^>]*>)+/g
      ) ||
      array[i].match(
        /(\s|<br \/>|<img[^>]*>|<video[^>]*>|<audio[^>]*>)+(<\/strong>|<\/em>|<\/code>|<\/span>)/g
      ) ||
      array[i].match(
        /(<span[^>]*><\/span>|<strong><\/strong>|<em><\/em>|<code[^>]*><\/code>)/g
      ) ||
      array[i].match(/(<\/strong><strong>|<\/em><em>|<\/code><code[^>]*>)/g) ||
      array[i].match(/(\s+<br \/>|<br \/>\s+)/g) ||
      array[i].match(/(<p>(<br \/>)+|(<br \/>)+<\/p>)/g) ||
      array[i].match(/(<p>\s+|\s+<\/p>)/g) ||
      array[i].match("<br /><br /><br />")
    ) {
      inspector = "found";
    }
    if (inspector == "inspect") {
      inspector = "clean";
    }
  }
  array[i] = array[i].trim();
}

//* --------------------------------------------- Line Markups

// Markup basic element tags
function ssjMarkupBasicTypes(array, i) {
  if (array[i].includes("<p>") || array[i].includes("<p ")) {
    ssjLine[i].Type.push("paragraph");
  } else if (array[i].search(/<h[1-6][^>]*>/) == 0) {
    ssjLine[i].Type.push("heading");
  } else if (array[i].includes("<hr />")) {
    ssjLine[i].Type.push("horizon");
  }
}
// Markup list tags
function ssjMarkupListTypes(array, i) {
  if (array[i].startsWith("<ol")) {
    ssjLine[i].Type.push("numlist_o");
  } else if (array[i].includes("</ol>")) {
    ssjLine[i].Type.push("numlist_x");
  } else if (array[i].startsWith("<ul")) {
    ssjLine[i].Type.push("bullist_o");
  } else if (array[i].includes("</ul>")) {
    ssjLine[i].Type.push("bullist_x");
  }
  if (array[i].startsWith("<li")) {
    if (array[i].includes("</li>")) {
      ssjLine[i].Type.push("list_item");
    } else {
      ssjLine[i].Type.push("list_item_o");
    }
  }
  if (array[i].includes("</li>")) {
    if (!array[i].startsWith("<li")) {
      ssjLine[i].Type.push("list_item_x");
    }
  }
}
// Markup table tags
function ssjMarkupTableTypes(array, i) {
  if (array[i].includes("<table")) {
    ssjLine[i].Type.push("table_o");
  } else if (array[i].includes("<thead")) {
    ssjLine[i].Type.push("thead_o");
  } else if (array[i].includes("<tbody")) {
    ssjLine[i].Type.push("tbody_o");
  } else if (array[i].includes("<tr")) {
    ssjLine[i].Type.push("tr_o");
  } else if (array[i].includes("</tr>")) {
    ssjLine[i].Type.push("tr_x");
  } else if (array[i].includes("</tbody>")) {
    ssjLine[i].Type.push("tbody_x");
  } else if (array[i].includes("</thead>")) {
    ssjLine[i].Type.push("thead_x");
  } else if (array[i].includes("</table>")) {
    ssjLine[i].Type.push("table_x");
  }
  if (array[i].includes("<th>") || array[i].includes("<th ")) {
    if (array[i].includes("</th>")) {
      ssjLine[i].Type.push("th_cell");
    } else {
      ssjLine[i].Type.push("th_cell_o");
    }
  }
  if (array[i].includes("</th>")) {
    if (!array[i].includes("<th")) {
      ssjLine[i].Type.push("th_cell_x");
    }
  }
  if (array[i].includes("<td")) {
    if (array[i].includes("</td>")) {
      ssjLine[i].Type.push("td_cell");
    } else {
      ssjLine[i].Type.push("td_cell_o");
    }
  }
  if (array[i].includes("</td>")) {
    if (!array[i].includes("<td")) {
      ssjLine[i].Type.push("td_cell_x");
    }
  }
}
// Markup div tags
function ssjMarkupDivTypes(array, i) {
  if (array[i].includes("<div")) {
    if (array[i].includes("</div>")) {
      ssjLine[i].Type.push("div_ox");
    } else {
      ssjLine[i].Type.push("div_o");
    }
  }
  if (array[i].includes("</div>") && !array[i].includes("<div")) {
    ssjLine[i].Type.push("div_x");
  }
}

//* --------------------------------------------- Line Mutations

// Convert phrase tags and quotes
function ssjConvertPhrases(array, i) {
  array[i] = array[i].replaceAll("<b>", "<strong>");
  array[i] = array[i].replaceAll("</b>", "<strong>");
  array[i] = array[i].replaceAll(/<strong[^>]*>/g, "<strong>");
  array[i] = array[i].replaceAll("<i>", "<em>");
  array[i] = array[i].replaceAll("</i>", "<em>");
  array[i] = array[i].replaceAll(/<em[^>]*>/g, "<em>");
  array[i] = array[i].replaceAll(
    "<u>",
    '<span style="text-decoration: underline;">'
  );
  array[i] = array[i].replaceAll("</u>", "</span>");
  array[i] = array[i].replaceAll("&lsquo;", "'");
  array[i] = array[i].replaceAll("&rsquo;", "'");
  array[i] = array[i].replaceAll("&ldquo;", '"');
  array[i] = array[i].replaceAll("&rdquo;", '"');
}
// Correct misspellings
function ssjCorrectSpellings(array, i) {
  array[i] = array[i].replaceAll("Log into", "Log in to");
  array[i] = array[i].replaceAll("Login to", "Log in to");
  array[i] = array[i].replaceAll(" log into", " log in to");
  array[i] = array[i].replaceAll(" login to", " log in to");
  array[i] = array[i].replaceAll("Sign into", "Sign in to");
  array[i] = array[i].replaceAll("Signin to", "Sign in to");
  array[i] = array[i].replaceAll(" sign into", " sign in to");
  array[i] = array[i].replaceAll(" signin to", " sign in to");
}
// Connect incomplete tags
function ssjAssembleTags(array, i) {
  if (array[i].includes("<")) {
    let open_o = array[i].lastIndexOf("<");
    let open_x = array[i].indexOf(">", open_o);
    if (open_x == -1) {
      let pieces = [];
      let j = i;
      let end;
      while (end != "found") {
        j += 1;
        if (array[j].includes(">")) {
          for (let index = i; index < j; index++) {
            pieces.push(array[index]);
            array[index] = "";
          }
          end = "found";
        }
      }
      array[j] = pieces.join("") + array[j];
    }
  }
}
//? Revise span tags
function ssjReviseSpans(array, i) {
  ssjStoreSpanTags(array, i);
  ssjReplaceSpans(array, i);
  ssjRemoveBlackSpans(array, i);
}
//? Revise anchor tags
function ssjReviseAnchors(array, i) {
  ssjStoreAnchorTags(array, i);
  ssjReplaceAnchors(array, i);
}
// Strip any tags in headings
function ssjStripHeadings(array, i) {
  if (array[i].match(/<h[1-6][^>]*>/)) {
    let heading = array[i].match(/<h[1-6][^>]*>/)[0];
    if (ssjGetText(array, i) != "") {
      if (
        !array[i].match('class="well"') &&
        !array[i].match('class="panel-title"') &&
        !ssjCode.SkipZones.Lists.includes(i)
      ) {
        if (array[i + 1] != null && array[i + 1] != "<hr />") {
          array[i] = array[i].replaceAll(
            heading,
            heading.slice(0, 3) + ' style="margin-bottom: 14px;">'
          );
        } else {
          array[i] = array[i].replace(heading, heading.slice(0, 3) + ">");
        }
      }
    } else {
      if (ssjMediaExists(array, i)) {
        array[i] = array[i].replace(/<h[1-6][^>]*>/, "<p>");
        array[i] = array[i].replace(/<\/h[1-6]>/, "</p>");
      } else if (!ssjContentExists(array, i)) {
        array[i] = "<p></p>";
      }
    }
    array[i] = array[i].replaceAll("<br />", " ");
    array[i] = array[i].replaceAll(/<strong[^>]*>/g, "");
    array[i] = array[i].replaceAll("</strong>", "");
    array[i] = array[i].replaceAll(/<em[^>]*>/g, "");
    array[i] = array[i].replaceAll("</em>", "");
  }
}
// Strip other tags
function ssjStripSpecials(array, i) {
  array[i] = array[i].replaceAll(
    /<code[^>]*>/g,
    '<code style="font-family: monospace; color: crimson; background-color: #F1F1F1; padding: 2px;">'
  );
  array[i] = array[i].replaceAll(
    /<pre[^>]*>/g,
    '<pre style="display: block; font-family: monospace; white-space: pre; margin: 1em 0;">'
  );
  array[i] = array[i].replaceAll(
    /<blockquote[^>]*>/g,
    `<blockquote style="display: block; margin: 1em 40px;">`
  );
  array[i] = array[i].replaceAll(/<br [^>]*>/g, "<br />");
  if (array[i] == "<br />") {
    array[i] = "";
  }
  array[i] = array[i].replaceAll(/<hr [^>]*>/g, "<hr />");
}
//Strip div tags
function ssjStripDivs(array, i) {
  if (
    array[i].startsWith("<div") &&
    array[i].endsWith("</div>") &&
    ssjContentExists(array, i) &&
    !array[i].match(/(<p>|<p [^>]*>)/)
  ) {
    array[i] = array[i].replace(/<div[^>]*>/, "<p>");
    array[i] = array[i].replace("</div>", "</p>");
  } else {
    array[i] = array[i].replaceAll(/<\/?div[^>]*>/g, "");
  }
}
// Strip image tags
function ssjReplaceImg(array, i) {
  if (!array[i].match(/<li[^>]*>/)) {
    let x = array[i].indexOf("<img");
    while (x != -1) {
      let img_o = x;
      let img_x = array[i].indexOf(">", img_o);
      let img = array[i].slice(img_o, img_x + 1);
      ssjTagAttributes = [];
      ssjRescueAttr(array, i, x, "<img", "src");
      let dim = ["width", "height"];
      for (let d = 0; d < dim.length; d++) {
        if (img.includes(dim[d] + "=")) {
          ssjRescueAttr(array, i, x, "<img", dim[d]);
        } else if (img.includes("style=")) {
          let value = ssjRescueValue(img, dim[d]);
          if (value != null) {
            if (value.match(/\d+px/)) {
              let value_n = value.match(/\d+/)[0];
              if (value_n != 0) {
                ssjTagAttributes.push(dim[d] + '="' + value_n + '"');
              }
            }
          }
        }
      }
      if (img.match(/border="[1-9]"/) || img.match(/border:\s*[1-9]px/)) {
        ssjTagAttributes.push('style="border: 1px solid black;" border="1"');
      }
      if (img.includes('align="center"') || img.includes("align: center")) {
        ssjTagAttributes.push('align="center"');
      }
      array[i] = array[i].replace(
        "<img ",
        "<dum " + ssjTagAttributes.join(" ") + "<junk"
      );
      x = array[i].indexOf("<img", x + 1);
    }
    array[i] = array[i].replaceAll("<dum", "<img");
    array[i] = array[i].replaceAll(/<junk[^>]*>/g, " />");
  }
}
// Remove comments
function ssjRemoveComments(array, i) {
  if (array[i].match("<!--")) {
    if (!array[i].match("-->")) {
      array[i] = array[i].replace(/<!--.*/, "");
      let end = i;
      while (end != "found") {
        end += 1;
        if (array[end].match("-->")) {
          for (let index = i + 1; index < end; index++) {
            array[index] = "";
          }
          array[end] = array[end].replace(/.*-->/, "");
          end = "found";
        }
      }
    } else {
      array[i] = array[i].replace(/<!--.*-->/, "");
    }
  }
}

//? ------------------------------ Spans

class ssjSpanClass {
  constructor() {}
}
//? Markup span tags
function ssjStoreSpanTags(array, i) {
  if (ssj_textdecor_check.checked) {
    ssjFindTags(array, i, "<span ");
    for (let j = 0; j < ssjTagIndexes.length; j++) {
      ssjLine[i].Spans[j] = new ssjSpanClass();
      let span = ssjLine[i].Spans[j];
      let open_o = ssjTagIndexes[j];
      let open_x = array[i].indexOf(">", open_o);
      span.OpenTag_O = open_o;
      span.OpenTag_X = open_x;
      span.Save = false;
      span.Tag = array[i].slice(open_o, open_x + 1);
      span.SaveTag = array[i]
        .slice(open_o, open_x + 1)
        .replace("<span", "<save");
      ssjSaveSpans(array, i, j, "color");
      ssjSaveSpans(array, i, j, "background-color");
      ssjSaveSpans(array, i, j, "text-decoration");
    }
  }
}
// Rename span tags that carry a given attribute value
function ssjSaveSpans(array, i, j, value) {
  // Find the value index
  let span = ssjLine[i].Spans[j];
  let value_o = array[i].indexOf(value, span.OpenTag_O);
  // Check that the value belongs to the current span
  if (
    value_o != -1 &&
    (array[i][value_o - 1] == '"' || array[i][value_o - 1] == " ") &&
    array[i].lastIndexOf("<", value_o) <= span.OpenTag_O &&
    span.OpenTag_O < array[i].lastIndexOf('style="', value_o) &&
    span.Save != true
  ) {
    // Save the closing span
    ssjMapInlineTag(array[i], span.OpenTag_O, "span");
    if (ssjCloseInline != null) {
      array[i] =
        array[i].slice(0, ssjCloseInline) +
        "</save>" +
        array[i].slice(ssjCloseInline + 7);
    }
    // Save the opening span
    span.Save = true;
    array[i] =
      array[i].slice(0, span.OpenTag_O) +
      span.SaveTag +
      array[i].slice(span.OpenTag_X + 1);
    let value_x = array[i].indexOf(";", value_o);
    span.Value = array[i].slice(value_o, value_x + 1);
    span.NewTag = '<new style="' + span.Value + ' font-size: 100%;">';
  }
}
//? Replace span tags
function ssjReplaceSpans(array, i) {
  for (j = 0; j < ssjLine[i].Spans.length; j++) {
    let span = ssjLine[i].Spans[j];
    array[i] = array[i].replace(span.SaveTag, span.NewTag);
  }
  array[i] = array[i].replaceAll(/<span[^>]*>/g, "");
  array[i] = array[i].replaceAll("</span>", "");
  array[i] = array[i].replaceAll("<new", "<span");
  array[i] = array[i].replaceAll("</save>", "</span>");
}
//? Remove black text spans
function ssjRemoveBlackSpans(array, i) {
  let black = [
    '<span style="color: #000000; font-size: 100%;">',
    '<span style="color: black; font-size: 100%;">',
  ];
  for (let x = 0; x < black.length; x++) {
    if (array[i].includes(black[x])) {
      let open_o = array[i].indexOf(black[x]);
      while (open_o != -1) {
        ssjMapInlineTag(array[i], open_o, "span");
        let close_o = ssjCloseInline;
        array[i] = array[i].slice(0, close_o) + array[i].slice(close_o + 7);
        open_o = array[i].indexOf(black[x], open_o + 1);
      }
      array[i] = array[i].replaceAll(black[x], "");
    }
  }
}

//? ------------------------------ Anchors

//? Store anchor tags
function ssjStoreAnchorTags(array, i) {
  ssjFindTags(array, i, "<a ");
  for (let j = 0; j < ssjTagIndexes.length; j++) {
    let open_o = ssjTagIndexes[j];
    let open_x = array[i].indexOf(">", open_o);
    let close_o = array[i].indexOf("</a>", open_x);
    let close_x = array[i].indexOf(">", close_o);
    ssjLine[i].Anchors[j] = {
      OpenTag_O: open_o,
      OpenTag_X: open_x,
      CloseTag_O: close_o,
      CloseTag_X: close_x,
      BeforeOpenTag: "",
      OpenTag: array[i].slice(open_o, open_x + 1),
      CloseTag: "</a>",
      Element: array[i].slice(open_o, close_x + 1),
      Label: array[i].slice(open_x + 1, close_o),
      LabelText: array[i]
        .slice(open_x + 1, close_o)
        .replaceAll(/<[^>]*>/g, "")
        .trim(),
      LabelPeriod: "",
      LabelSpace: "",
      Url: "",
      Title: "",
      TitlePeriod: "",
      Target: "",
      Id: "",
      DataToggle: "",
      DataParent: "",
      DataTarget: "",
      Class: "",
      Style: "",
      Type: "",
      NewElement: "",
    };
    ssjAddAnchorAttr(array, i, j);
    ssjAddAnchorType(i, j);
    ssjAddAnchorProtocol(i, j);
    ssjShiftAnchorEnds(array, i, j);
  }
}
// Construct attributes for the anchor
function ssjAddAnchorAttr(array, i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.OpenTag.includes(" href=")) {
    let Url_O = array[i].indexOf(" href=", anchors.OpenTag_O) + 7;
    let Url_X = array[i].indexOf('"', Url_O);
    anchors.Url = array[i].slice(Url_O, Url_X);
  }
  if (anchors.OpenTag.includes(" title=")) {
    let Title_O = array[i].indexOf(" title=", anchors.OpenTag_O) + 8;
    let AfterTitle = array[i].indexOf('="', Title_O);
    let Title_X = array[i].lastIndexOf('"', AfterTitle);
    anchors.Title = array[i].slice(Title_O, Title_X);
  }
  if (anchors.OpenTag.includes(" target=")) {
    let Target_O = array[i].indexOf(" target=", anchors.OpenTag_O) + 9;
    let Target_X = array[i].indexOf('"', Target_O);
    anchors.Target = array[i].slice(Target_O, Target_X);
  }
  if (anchors.OpenTag.includes(" id=")) {
    let Id_O = array[i].indexOf(" id=", anchors.OpenTag_O) + 5;
    let Id_X = array[i].indexOf('"', Id_O);
    anchors.Id = array[i].slice(Id_O, Id_X);
  }
  if (anchors.OpenTag.includes(" data-toggle=")) {
    let DataToggle_O =
      array[i].indexOf(" data-toggle=", anchors.OpenTag_O) + 14;
    let DataToggle_X = array[i].indexOf('"', DataToggle_O);
    anchors.DataToggle = array[i].slice(DataToggle_O, DataToggle_X);
  }
  if (anchors.OpenTag.includes(" data-parent=")) {
    let DataParent_O =
      array[i].indexOf(" data-parent=", anchors.OpenTag_O) + 14;
    let DataParent_X = array[i].indexOf('"', DataParent_O);
    anchors.DataParent = array[i].slice(DataParent_O, DataParent_X);
  }
  if (anchors.OpenTag.includes(" data-target=")) {
    let DataTarget_O =
      array[i].indexOf(" data-target=", anchors.OpenTag_O) + 14;
    let DataTarget_X = array[i].indexOf('"', DataTarget_O);
    anchors.DataTarget = array[i].slice(DataTarget_O, DataTarget_X);
  }
  if (anchors.OpenTag.includes(" class=")) {
    let Class_O = array[i].indexOf(" class=", anchors.OpenTag_O) + 8;
    let Class_X = array[i].indexOf('"', Class_O);
    anchors.Class = array[i].slice(Class_O, Class_X);
  }
  if (anchors.OpenTag.includes(" style=")) {
    let Style_O = array[i].indexOf(" style=", anchors.OpenTag_O) + 8;
    let Style_X = array[i].indexOf('"', Style_O);
    anchors.Style = array[i].slice(Style_O, Style_X);
  }
}
// Identify the anchor type
function ssjAddAnchorType(i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.Url.startsWith("mailto:")) {
    anchors.Type = "email";
  } else if (anchors.Url.startsWith("#")) {
    anchors.Type = "jump";
  } else if (anchors.Url.startsWith("sys_attachment")) {
    anchors.Type = "attachment";
  } else if (anchors.Url.startsWith("tel:")) {
    anchors.Type = "phone";
  } else if (anchors.DataToggle != "" || anchors.Class.includes("nav")) {
    anchors.Type = "acc_tab";
  } else if (anchors.Id != "" && anchors.Url == "") {
    anchors.Type = "anchor";
  } else if (anchors.Url != "") {
    anchors.Type = "hyperlink";
  }
}
// Include a protocol for the anchor object URL
function ssjAddAnchorProtocol(i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.Type == "hyperlink") {
    if (!anchors.Url.startsWith("http")) {
      anchors.Url = "https://" + anchors.Url;
    }
  }
}
// Shift periods and spaces around the anchor object
function ssjShiftAnchorEnds(array, i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.LabelText.endsWith(".")) {
    let Period = array[i].lastIndexOf(".", anchors.CloseTag_O);
    let BeforePeriod = array[i][Period - 1];
    let BeforeOpenTag = array[i].slice(
      anchors.OpenTag_O - 2,
      anchors.OpenTag_O
    );
    let BeforeOpenTagQuote = array[i].slice(
      anchors.OpenTag_O - 3,
      anchors.OpenTag_O
    );
    let ZeroToOpenTag = array[i]
      .slice(0, anchors.OpenTag_O)
      .replaceAll(/<[^>]*>/g, "")
      .trim();
    let FirstText = anchors.LabelText[0];
    if (
      (BeforeOpenTag != ". " &&
        BeforeOpenTag != "? " &&
        BeforeOpenTag != "! " &&
        BeforeOpenTagQuote != '." ' &&
        BeforeOpenTagQuote != '!" ' &&
        BeforeOpenTagQuote != '?" ' &&
        ZeroToOpenTag != "") ||
      !FirstText.match(/[A-Z]/)
    ) {
      anchors.LabelPeriod = "move";
    }
  }
  if (anchors.Title.endsWith(".")) {
    anchors.TitlePeriod = "remove";
  }
  if (array[i][anchors.OpenTag_O + 1] == " ") {
    anchors.LabelSpace = "move";
  }
}
//? Replace anchor tags
function ssjReplaceAnchors(array, i) {
  array[i] = array[i].replaceAll(" </a>", "</a> ");
  for (let j = 0; j < Object.keys(ssjLine[i].Anchors).length; j++) {
    ssjRemoveLabelPeriods(i, j);
    ssjRemoveTitlePeriods(i, j);
    ssjMoveLabelSpaces(i, j);
    ssjOpenNewWindow(i, j);
    ssjReconstructAnchor(i, j);
    array[i] = array[i].replace(
      ssjLine[i].Anchors[j].Element,
      ssjLine[i].Anchors[j].NewElement
    );
  }
  array[i] = array[i].replaceAll("<?!", "<a ");
}
// Remove periods from the anchor label
function ssjRemoveLabelPeriods(i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.LabelPeriod == "move") {
    let Period = anchors.Label.lastIndexOf(".", anchors.Label.length);
    let BeforePeriod = anchors.Label.slice(0, Period);
    let AfterPeriod = anchors.Label.slice(Period + 1);
    anchors.Label = BeforePeriod.concat(AfterPeriod);
    anchors.CloseTag = "</a>.";
  }
}
// Remove periods from the anchor title
function ssjRemoveTitlePeriods(i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.TitlePeriod == "remove") {
    let Period = anchors.Title.lastIndexOf(".", anchors.Title.length);
    let BeforePeriod = anchors.Title.slice(0, Period);
    let AfterPeriod = anchors.Title.slice(Period + 1);
    anchors.Title = BeforePeriod + AfterPeriod;
  }
}
// Move spaces from the anchor label
function ssjMoveLabelSpaces(i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.LabelSpace == "move") {
    anchors.Label = anchors.Label.trim();
    anchors.Title = anchors.Title.trim();
  }
}
// Open hyperlinks in a new window and clean up the label
function ssjOpenNewWindow(i, j) {
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.Type == "hyperlink") {
    anchors.Target = "_blank";
    anchors.Label = anchors.Label.replace("https://", "");
    anchors.Label = anchors.Label.replace("http://", "");
    anchors.Label = anchors.Label.replace("www.", "");
    if (anchors.Label.endsWith("/")) {
      anchors.Label = anchors.Label.slice(0, -1);
    }
  } else {
    anchors.Target = "";
  }
}
// Reconstruct the anchor
function ssjReconstructAnchor(i, j) {
  let AnchorAttr = [];
  let anchors = ssjLine[i].Anchors[j];
  if (anchors.Id != "") {
    AnchorAttr.push('id="' + anchors.Id + '"');
  }
  if (anchors.Title != "") {
    AnchorAttr.push('title="' + anchors.Title + '"');
  }
  if (anchors.Url != "") {
    AnchorAttr.push('href="' + anchors.Url + '"');
  }
  if (anchors.Target != "") {
    AnchorAttr.push('target="' + anchors.Target + '"');
  }
  if (anchors.DataToggle != "") {
    AnchorAttr.push('data-toggle="' + anchors.DataToggle + '"');
    if (anchors.Style != "") {
      AnchorAttr.push('style="' + anchors.Style + '"');
    }
    if (anchors.Class != "") {
      AnchorAttr.push('class="' + anchors.Class + '"');
    }
  } else if (anchors.Class.includes("btn")) {
    AnchorAttr.push('class="' + anchors.Class + '"');
  }
  if (anchors.DataParent != "") {
    AnchorAttr.push('data-parent="' + anchors.DataParent + '"');
  }
  if (anchors.DataTarget != "") {
    AnchorAttr.push('data-target="' + anchors.DataTarget + '"');
  }
  if (anchors.LabelSpace == "move") {
    anchors.BeforeOpenTag = " ";
  }
  anchors.NewElement =
    anchors.BeforeOpenTag +
    "<?!" +
    AnchorAttr.join(" ") +
    ">" +
    anchors.Label +
    anchors.CloseTag;
}

//* --------------------------------------------- Loop Mutations

// LOOP Convert spaces
function ssjConvertSpaces(array, i) {
  array[i] = array[i].replaceAll("&nbsp;", " ").replaceAll(/\s+/g, " ");
}
// LOOP Condense breaks
function ssjCondenseBreaks(array, i) {
  array[i] = array[i].replaceAll(/\s*<br \/>\s*/g, "<br />");
  array[i] = array[i].replaceAll(/<br \/>(<br \/>)+/g, "<br /><br />");
  array[i] = array[i].replaceAll(/(<p>|<p [^>]*>)(<br \/>)+\s*/g, "<p>");
  array[i] = array[i].replaceAll(/\s*(<br \/>)+<\/p>/g, "</p>");
}
// LOOP Shift inline tags around spaces and breaks
function ssjShiftInline(array, i) {
  let open = ["<strong>", "<em>"];
  if (array[i].match(/<code[^>]*>/g)) {
    let code = array[i].match(/<code[^>]*>/g);
    for (let x = 0; x < code.length; x++) {
      if (!open.includes(code[x])) {
        open.push(code[x]);
      }
    }
  }
  if (array[i].match(/<span[^>]*>/g)) {
    let span = array[i].match(/<span[^>]*>/g);
    for (let x = 0; x < span.length; x++) {
      if (!open.includes(span[x])) {
        open.push(span[x]);
      }
    }
  }
  for (let x = 0; x < open.length; x++) {
    array[i] = array[i].replaceAll(open[x] + " ", " " + open[x]);
    array[i] = array[i].replaceAll(
      open[x] + "<br /><br />",
      "<br /><br />" + open[x]
    );
    array[i] = array[i].replaceAll(open[x] + "<br />", "<br />" + open[x]);
  }
  let close = ["</strong>", "</em>", "</code>", "</span>"];
  for (let x = 0; x < close.length; x++) {
    array[i] = array[i].replaceAll(" " + close[x], close[x] + " ");
    array[i] = array[i].replaceAll(
      "<br /><br />" + close[x],
      close[x] + "<br /><br />"
    );
    array[i] = array[i].replaceAll("<br />" + close[x], close[x] + "<br />");
  }
  array[i] = array[i].replaceAll(":</strong> ", ":</strong>&nbsp; ");
  array[i] = array[i].replaceAll(":</em> ", ":</em>&nbsp; ");
}
// LOOP Shift or remove inline tags around media
function ssjShiftMedia(array, i) {
  let media = [];
  if (array[i].match(/<img[^>]*>/g)) {
    let image = array[i].match(/<img[^>]*>/g);
    for (let x = 0; x < image.length; x++) {
      if (!media.includes(image[x])) {
        media.push(image[x]);
      }
    }
  }
  if (array[i].match(/<video.*\/video>/g)) {
    let video = array[i].match(/<video.*\/video>/g);
    for (let x = 0; x < video.length; x++) {
      if (!media.includes(video[x])) {
        media.push(video[x]);
      }
    }
  }
  if (array[i].match(/<audio.*\/audio>/g)) {
    let audio = array[i].match(/<audio.*\/audio>/g);
    for (let x = 0; x < audio.length; x++) {
      if (!media.includes(audio[x])) {
        media.push(audio[x]);
      }
    }
  }
  let open = ["<strong>", "<em>"];
  if (array[i].match(/<code[^>]*>/g)) {
    open.push(array[i].match(/<code[^>]*>/g)[0]);
  }
  if (array[i].match(/<span[^>]*>/g)) {
    let span = array[i].match(/<span[^>]*>/g);
    for (let x = 0; x < span.length; x++) {
      if (!open.includes(span[x])) {
        open.push(span[x]);
      }
    }
  }
  let close = ["</strong>", "</em>", "</code>", "</span>"];
  for (let x = 0; x < media.length; x++) {
    for (let y = 0; y < open.length; y++) {
      array[i] = array[i].replaceAll(open[y] + media[x], media[x] + open[y]);
    }
    for (let z = 0; z < close.length; z++) {
      array[i] = array[i].replaceAll(media[x] + close[z], close[z] + media[x]);
    }
  }
}
// LOOP Remove phrase tags
function ssjRemoveStyles(array, i) {
  array[i] = array[i].replaceAll("<strong></strong>", "");
  array[i] = array[i].replaceAll("</strong><strong>", "");
  array[i] = array[i].replaceAll("</strong> <strong>", " ");
  array[i] = array[i].replaceAll("<em></em>", "");
  array[i] = array[i].replaceAll("</em><em>", "");
  array[i] = array[i].replaceAll("</em> <em>", " ");
  array[i] = array[i].replaceAll(/<span[^>]*><\/span>/g, "");
  array[i] = array[i].replaceAll(/<code[^>]*><\/code>/g, "");
  array[i] = array[i].replaceAll(/<\/code><code[^>]*>/g, "");
  array[i] = array[i].replaceAll(/<\/code> <code[^>]*>/g, " ");
}
// LOOP Trim block tags
function ssjTrimBlocks(array, i) {
  array[i] = array[i].replace(/(<p>|<p [^>]*>)\s*/, "<p>");
  array[i] = array[i].replace(/\s*<\/p>/, "</p>");
  if (array[i].match(/<h[1-6][^]*>/g)) {
    let heading_o = array[i].match(/<h[1-6][^]*>/g)[0];
    array[i] = array[i].replaceAll(heading_o + " ", heading_o);
    let heading_x = array[i].match(/<\/h[1-6]>/g)[0];
    array[i] = array[i].replaceAll(" " + heading_x, heading_x);
  }
  if (array[i].match(/<td[^]*>/g)) {
    let datacell = array[i].match(/<td[^]*>/g)[0];
    array[i] = array[i].replaceAll(datacell + " ", datacell);
    array[i] = array[i].replaceAll(/\s*<\/td>/g, "</td>");
  }
  if (array[i].includes("<th>") || array[i].match(/<th [^]*>/g)) {
    let headcell = array[i].match(/<th[^]*>/g)[0];
    array[i] = array[i].replaceAll(headcell + " ", headcell);
    array[i] = array[i].replaceAll(/\s*<\/th>/g, "</th>");
  }
  if (array[i].match(/<li[^]*>/g)) {
    let item_o = array[i].match(/<li[^>]*>/g)[0];
    array[i] = array[i].replaceAll(item_o + " ", "<li>");
  }
  array[i] = array[i].replaceAll(/\s*<\/li>/g, "</li>");
}
// LOOP Zero empty paragraphs and horizontal rules
function ssjZeroEmptyLines(array, i) {
  if (array[i].startsWith("<p>") || array[i].match(/<p [^>]*>/)) {
    if (!ssjContentExists(array, i)) {
      array[i] = "<p></p>";
    }
  }
  if (array[ssjPrevLine(array, i)] != null) {
    if (array[ssjPrevLine(array, i)] == "<hr />" && array[i] == "<hr />") {
      array[ssjPrevLine(array, i)] = "";
    } else if (array[ssjPrevLine(array, i)] == "<p></p>") {
      if (
        array[i] == "<p></p>" ||
        array[i].startsWith("<ol") ||
        array[i].startsWith("<ul")
      ) {
        array[ssjPrevLine(array, i)] = "";
      }
    }
  }
  array[i] = array[i].replaceAll(/<h[1-6][^>]*><\/h[1-6][^>]*>/g, "<p></p>");
}

//! ------------------------------------------------------------ Advanced Functions

//? Run advanced functions
function ssjRunAdvanced() {
  let ssjArray = ssjOutputBox.value.split("\n");
  ssjSkipToC(ssjArray);
  ssjConvertBreaks(ssjArray);
  ssjUpgradeAccordions(ssjArray);
  ssjArray = ssjArray.filter((value) => Object.keys(value).length !== 0);
  // Display the results in the code box
  ssjOutputBox.value = ssjArray.join("\n");
  document.getElementById("ssj_code_box").style.color = "#DF5601";
  sampleBox.value = samples;
  ssjDisplayStats();
}
// Convert breaks into paragraphs
function ssjConvertBreaks(array) {
  if (ssj_breaks_check.checked) {
    for (let i = ssjSkip; i < array.length; i++) {
      array[i] = array[i].replaceAll(/<br [^>]*>/g, "<br />");
      if (array[i].startsWith("<p") && array[i].endsWith("</p>")) {
        array[i] = array[i].replaceAll(/(<br \/>)+/g, "</p>\n<p>");
      } else if (array[i].trim() == "<br />") {
        array[i] = "";
      }
    }
  }
}
// Upgrade accordions
function ssjUpgradeAccordions(array) {
  if (ssj_upgrade_acc_check.checked) {
    for (let i = ssjSkip; i < array.length; i++) {
      // Upgrade accordion type 2
      array[i] = array[i].replaceAll(
        '<div class="panel panel-default" style="box-shadow: none;">',
        '<div class="panel panel-default" style="box-shadow: none; border: none;">'
      );
      array[i] = array[i].replaceAll(
        'class="btn btn-primary"',
        'class="btn btn-default"'
      );
      array[i] = array[i].replaceAll(
        'class="btn btn-success"',
        'class="btn btn-default"'
      );
      array[i] = array[i].replaceAll(
        'class="btn btn-info"',
        'class="btn btn-default"'
      );
      array[i] = array[i].replaceAll(
        'class="btn btn-warning"',
        'class="btn btn-default"'
      );
      array[i] = array[i].replaceAll(
        'class="btn btn-danger"',
        'class="btn btn-default"'
      );
      array[i] = array[i].replaceAll(
        '<div class="panel-body">',
        '<div class="panel-body" style="border: 1px solid #d5d8de; border-radius: 8px;">'
      );
      // Upgrade accordion type 1
      array[i] = array[i].replaceAll(
        'class="panel list-group"',
        'class="panel-group"'
      );
      array[i] = array[i].replaceAll(
        /<a class="list-group-item" style="[^"]*"/g,
        '<a class="btn btn-default" style="width: 100%; text-align: left;"'
      );
      array[i] = array[i].replaceAll(
        'class="collapse"',
        'class="panel-collapse collapse"'
      );
      array[i] = array[i].replaceAll(
        /<div class="list-group-item" style="[^"]*"/g,
        '<div class="panel-body" style="border: 1px solid #d5d8de; border-radius: 8px;"'
      );
    }
  }
}

//! ------------------------------------------------------------ COMMENTS

// Strip HTML from the source box
function godStripCode() {
  godOutputBox.innerHTML = "";
  let array = godInputBox.value.split("\n");
  for (let i = 0; i < array.length; i++) {
    godFormatHTML(array, i);
  }
  godOutputBox.innerHTML = array.join("\n");
}
// Clear code
function godClearCode() {
  godInputBox.value = "";
  godOutputBox.innerHTML = "";
}

//! ------------------------------------------------------------ COMPARE

// Format HTML
function godFormatHTML(array, i) {
  array[i] = array[i].replaceAll(
    'src="/',
    'src="/https://linkedin.service-now.com/'
  );
  /*
  if (array[i].includes("img style")) {
    array[i] = array[i].replaceAll(
      '<img style="',
      '<img style="max-width: 100%; '
    );
  } else {
    array[i] = array[i].replaceAll("<img", '<img style="max-width: 100%;"');
  }
  */
  if (i == array.length - 1 && array[i][array[i].length - 1] == '"') {
    array[i] = array[i].slice(0, -1)
  };
  if (i == 0 && array[i][0] == '"') {
    array[i] = array[i].slice(1)
  };
}

//? ------------------------------ Code 1 (Frieza)

// Strip HTML from the source box
function frzStripCode() {
  frzOutputBox.innerHTML = "";
  let array = frzInputBox.value.split("\n");
  for (let i = 0; i < array.length; i++) {
    godFormatHTML(array, i);
  }
  frzOutputBox.innerHTML = array.join("\n");
}
// Clear code
function frzClearCode() {
  frzInputBox.value = "";
  frzOutputBox.innerHTML = "";
}

//? ------------------------------ Code 2 (Buu)

// Strip HTML from the source box
function buuStripCode() {
  buuOutputBox.innerHTML = "";
  let array = buuInputBox.value.split("\n");
  for (let i = 0; i < array.length; i++) {
    godFormatHTML(array, i);
  }
  buuOutputBox.innerHTML = array.join("\n");
}
// Clear code
function buuClearCode() {
  buuInputBox.value = "";
  buuOutputBox.innerHTML = "";
}

//! ------------------------------------------------------------ ACCORDIONS

function genAcc2Width(val) {
  document.getElementById("acc2_width_amount").innerHTML = val + "px";
  if (document.getElementById("acc2_width_field").value == 0) {
    document.getElementById("acc2_width_amount").innerHTML = "auto";
  }
}
function genAcc2Padding(val) {
  document.getElementById("acc2_padding_amount").innerHTML = val + "px";
  if (document.getElementById("acc2_padding_field").value == 0) {
    document.getElementById("acc2_padding_amount").innerHTML = "auto";
  }
}
function genAcc2Fields() {
  document.getElementById("acc2_fields").innerHTML = "";
  document.getElementById("acc2_id_field").value = "";
  for (let i = 1; i <= document.getElementById("acc2_quantity").value; i++) {
    let acc2DivFields = document.createElement("DIV");
    acc2DivFields.setAttribute("id", `acc2_div_field${i}`);
    acc2DivFields.style.display = "block";
    acc2DivFields.style.marginTop = "5px";
    let acc2IdFields = document.createElement("INPUT");
    acc2IdFields.setAttribute("type", "text");
    acc2IdFields.setAttribute("id", `acc2_id_field${i}`);
    acc2IdFields.setAttribute("placeholder", `Accordion item ${i} ID`);
    acc2IdFields.setAttribute("oninput", "genAcc2Code()");
    acc2IdFields.style.float = "left";
    let acc2NameFields = document.createElement("INPUT");
    acc2NameFields.setAttribute("type", "text");
    acc2NameFields.setAttribute("id", `acc2_name_field${i}`);
    acc2NameFields.setAttribute("placeholder", `Accordion item ${i} name`);
    acc2NameFields.setAttribute("oninput", "genAcc2Code()");
    acc2DivFields.appendChild(acc2IdFields);
    acc2DivFields.appendChild(acc2NameFields);
    document.getElementById("acc2_fields").appendChild(acc2DivFields);
  }
}
function genAcc2Code() {
  let acc2Color = "";
  switch (document.getElementById("acc2_color_field").value) {
    case "Default":
      acc2Color = " btn-default";
      break;
    case "Blue":
      acc2Color = " btn-primary";
      break;
    case "Green":
      acc2Color = " btn-success";
      break;
    case "Light Blue":
      acc2Color = " btn-info";
      break;
    case "Orange":
      acc2Color = " btn-warning";
      break;
    case "Red":
      acc2Color = " btn-danger";
      break;
  }
  let acc2ColorString = `${acc2Color}`;
  let acc2WidthString = ` style="width: ${
    document.getElementById("acc2_width_field").value
  }px;"`;
  let acc2PaddingString = ` padding: ${
    document.getElementById("acc2_padding_field").value
  }px;`;
  let acc2IdValue = document
    .getElementById("acc2_id_field")
    .value.replace(/ /g, "")
    .trim();
  let acc2ItemIdValue = "";
  let acc2Loop = "";
  let acc2NameValue = "";
  if (document.getElementById("acc2_width_field").value == 0) {
    acc2WidthString = "";
  }
  if (document.getElementById("acc2_padding_field").value == 0) {
    acc2PaddingString = "";
  }
  if (acc2IdValue == false) {
    acc2IdValue = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
  }
  for (let i = 1; i <= document.getElementById("acc2_quantity").value; i++) {
    acc2NameValue = document.getElementById(`acc2_name_field${i}`).value.trim();
    acc2ItemIdValue = document
      .getElementById(`acc2_id_field${i}`)
      .value.replace(/ /g, "")
      .trim();
    if (acc2NameValue == false) {
      acc2NameValue = `Accordion item ${i}`;
    }
    if (acc2ItemIdValue == false) {
      acc2ItemIdValue = `${acc2IdValue}-${i}`;
    }
    acc2Loop += `<!--Start acc item ${i} "${acc2ItemIdValue}"--><div class="panel panel-default" style="box-shadow: none; border: none;">
<!--Start acc item ${i} head "${acc2ItemIdValue}"--><table><tr><td>
<a class="btn${acc2ColorString}" style="width: 100%; text-align: left;" data-toggle="collapse" data-parent="#${acc2IdValue}" data-target="#${acc2ItemIdValue}">
${acc2NameValue}
<!--End acc item ${i} head "${acc2ItemIdValue}"--></a></td></tr></table>
<!--Start acc item ${i} body "${acc2ItemIdValue}"-->
<div id="${acc2ItemIdValue}" class="panel-collapse collapse"><div class="panel-body" style="border: 1px solid #d5d8de; border-radius: 8px;${acc2PaddingString}">
<table><tr><td>Content for ${acc2NameValue}</td></tr></table></div>
<!--End acc item ${i} body "${acc2ItemIdValue}"--></div>
<!--End acc item ${i} "${acc2ItemIdValue}"--></div>
`;
  }
  document.getElementById(
    "acc2_code_box"
  ).value = `<!--Start acc set "${acc2IdValue}"--><div class="panel-group" id="${acc2IdValue}"${acc2WidthString}>
${acc2Loop}<!--End acc set "${acc2IdValue}"--></div>`;
}
function copyAcc2Code() {
  const acc2CopyText = document.getElementById("acc2_code_box");
  acc2CopyText.select();
  acc2CopyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

//! ------------------------------------------------------------ TABS

function genTabImgWidth(val) {
  document.getElementById("tab_imgwidth_amount").innerHTML = val + "px";
}
function genTabImgWidthDisplay() {
  let tabImgWidthField = document.getElementById("tab_imgwidth_display");
  if (tabImgWidthField.style.display == "none") {
    tabImgWidthField.style.display = "block";
  } else {
    tabImgWidthField.style.display = "none";
  }
}
function genTabFields() {
  document.getElementById("tab_fields").innerHTML = "";
  document.getElementById("tab_id_field").value = "";
  for (let i = 1; i <= document.getElementById("tab_quantity").value; i++) {
    let tabDiv = document.createElement("DIV");
    tabDiv.style.display = "block";
    tabDiv.style.marginTop = "5px";
    let tabIdFields = document.createElement("INPUT");
    tabIdFields.setAttribute("type", "text");
    tabIdFields.setAttribute("id", `tab_id_field${i}`);
    tabIdFields.setAttribute("placeholder", `Tab ${i} ID`);
    tabIdFields.setAttribute("oninput", "genTabCode()");
    tabIdFields.style.float = "left";
    let tabNameFields = document.createElement("INPUT");
    tabNameFields.setAttribute("type", "text");
    tabNameFields.setAttribute("id", `tab_name_field${i}`);
    tabNameFields.setAttribute("placeholder", `Tab ${i} name`);
    tabNameFields.setAttribute("oninput", "genTabCode()");
    tabNameFields.style.float = "left";
    let tabImgDiv = document.createElement("DIV");
    tabImgDiv.style.display = "block";
    let tabImgSrcLabels = document.createElement("LABEL");
    tabImgSrcLabels.setAttribute("for", `tab_imgsrc_field${i}`);
    tabImgSrcLabels.setAttribute("class", "sub_label_margin");
    tabImgSrcLabels.innerHTML = "img src = ";
    tabImgSrcLabels.style.float = "left";
    let tabImgSrcFields = document.createElement("INPUT");
    tabImgSrcFields.setAttribute("type", "text");
    tabImgSrcFields.setAttribute("id", `tab_imgsrc_field${i}`);
    tabImgSrcFields.setAttribute("placeholder", `Tab ${i} image source`);
    tabImgSrcFields.setAttribute("oninput", "genTabCode()");
    tabImgSrcFields.style.float = "left";
    let tabDropDiv = document.createElement("DIV");
    tabDropDiv.style.display = "block";
    let tabDropQuantLabels = document.createElement("LABEL");
    tabDropQuantLabels.setAttribute("for", `tab_drop_quantity${i}`);
    tabDropQuantLabels.setAttribute("class", "sub_label_margin");
    tabDropQuantLabels.innerHTML = `dropdowns `;
    tabDropQuantLabels.style.float = "left";
    let tabDropQuantFields = document.createElement("INPUT");
    tabDropQuantFields.setAttribute("type", "number");
    tabDropQuantFields.setAttribute("id", `tab_drop_quantity${i}`);
    tabDropQuantFields.setAttribute("min", "0");
    tabDropQuantFields.setAttribute("max", "20");
    tabDropQuantFields.setAttribute("oninput", "genDropFields(), genTabCode()");
    tabDropQuantFields.style.float = "left";
    let tabDropDivFields = document.createElement("DIV");
    tabDropDivFields.setAttribute("id", `tab_drop_div_field${i}`);
    tabDropDivFields.style.float = "left";
    tabDiv.appendChild(tabIdFields);
    tabDiv.appendChild(tabNameFields);
    if (tab_image_check.checked == true) {
      tabImgDiv.appendChild(tabImgSrcLabels);
      tabImgDiv.appendChild(tabImgSrcFields);
    }
    tabDropDiv.appendChild(tabDropQuantLabels);
    tabDropDiv.appendChild(tabDropQuantFields);
    tabDropDiv.appendChild(tabDropDivFields);
    document.getElementById("tab_fields").appendChild(tabDiv);
    document.getElementById("tab_fields").appendChild(tabImgDiv);
    document.getElementById("tab_fields").appendChild(tabDropDiv);
  }
}
function genDropFields() {
  for (let i = 1; i <= document.getElementById("tab_quantity").value; i++) {
    document.getElementById(`tab_drop_div_field${i}`).innerHTML = "";
    for (
      let j = 1;
      j <= document.getElementById(`tab_drop_quantity${i}`).value;
      j++
    ) {
      let tabDropFields = document.createElement("INPUT");
      tabDropFields.setAttribute("type", "text");
      tabDropFields.setAttribute("id", `tab_drop_field${i}-${j}`);
      tabDropFields.setAttribute("placeholder", `Tab ${i} dropdown ${j} name`);
      tabDropFields.setAttribute("oninput", "genTabCode()");
      tabDropFields.style.display = "block";
      document
        .getElementById(`tab_drop_div_field${i}`)
        .appendChild(tabDropFields);
    }
  }
}
function genTabCode() {
  let tabRadioValue = "";
  let tabShowValue = "";
  let tabFadeValue = "";
  let tabHeadClass = "";
  let tabHeadToggle = "";
  let tabHeadClassDrop = "";
  let tabNameValue = "";
  let tabDropNameValue = "";
  let tabIdValue = document
    .getElementById("tab_id_field")
    .value.replace(/ /g, "");
  let tabItemIdValue = "";
  let tabDropIdValue = "";
  let tabDropQuantity = "";
  let tabJustifiedValue = "";
  let tabBody = "";
  let tabLoopHead = "";
  let tabLoopBody = "";
  let tabLoopDropHead = "";
  let tabLoopDropBody = "";
  let tabDropStart = "";
  let tabDropEnd = "";
  let tabNameBreak = "";
  let tabImageSource = "";
  let tabImgSrcValue = "";
  let tabImageWidth = "";
  let tabTextCenter = "";
  let tabPillButton = "";
  if (tab_radio_tab.checked == true) {
    tabRadioValue = "tab";
  } else {
    tabRadioValue = "pill";
  }
  if (tabIdValue == false) {
    tabIdValue = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);
  }
  if (tab_justified_check.checked == true) {
    tabJustifiedValue =
      ' flex-container" style="width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: flex-end; position: relative; left: -40px;';
  } else {
    tabJustifiedValue = '" style="position: relative; left: -40px;';
  }
  for (let i = 1; i <= document.getElementById("tab_quantity").value; i++) {
    tabNameValue = document.getElementById(`tab_name_field${i}`).value.trim();
    tabItemIdValue = document
      .getElementById(`tab_id_field${i}`)
      .value.replace(/ /g, "")
      .trim();
    tabDropQuantity = document.getElementById(`tab_drop_quantity${i}`).value;
    if (tabNameValue == false) {
      tabNameValue = `Tab ${i}`;
    }
    if (tabItemIdValue == false) {
      tabItemIdValue = `${tabIdValue}-${i}`;
    }
    if (i == 1 && tab_show_check.checked == true) {
      tabShowValue = " in active";
      if (tabDropQuantity > 0) {
        tabHeadClass = ' class="dropdown active"';
      } else {
        tabHeadClass = ' class="active"';
      }
    } else if (tabDropQuantity > 0) {
      tabShowValue = "";
      tabHeadClass = ' class="dropdown"';
    } else {
      tabShowValue = "";
      tabHeadClass = "";
    }
    if (tab_fade_check.checked == true) {
      tabFadeValue = " fade";
    } else {
      tabFadeValue = "";
    }
    if (tabDropQuantity == false) {
      tabDropStart = "";
      tabDropEnd = "";
      tabHeadToggle = `${tabRadioValue}`;
    } else {
      tabDropStart = `
<!--Start ${tabRadioValue} ${i} subhead(s)--><ul class="dropdown-menu" style="left: -40px;">`;
      tabDropEnd = `
<!--End ${tabRadioValue} ${i} subhead(s)--></ul>`;
      tabHeadToggle = "dropdown";
    }
    if (tabDropQuantity > 0) {
      tabHeadClassDrop = 'class="dropdown-toggle" ';
    } else {
      tabHeadClassDrop = "";
    }
    if (tab_radio_tab.checked == false) {
      tabPillButton =
        'class="btn btn-default" style="border: 1px solid #d5d5d5; font-size: 14px;" role="button" ';
    } else {
      tabPillButton = "";
    }
    if (tab_image_check.checked == false) {
      tabImageSource = "";
    } else {
      if (document.getElementById(`tab_imgsrc_field${i}`).value == false) {
        tabImgSrcValue = '"sky_anpanman.pngx"';
      } else {
        tabImgSrcValue = document.getElementById(`tab_imgsrc_field${i}`).value;
      }
      tabImageWidth = document.getElementById("tab_imgwidth_field").value;
      tabImageSource = `<br><img src=${tabImgSrcValue} width="${tabImageWidth}">`;
      tabTextCenter = ' style="text-align: center;"';
    }
    for (let j = 1; j <= tabDropQuantity; j++) {
      if (document.getElementById(`tab_drop_field${i}-${j}`).value == false) {
        tabDropNameValue = `${tabNameValue} dropdown ${j}`;
      } else {
        tabDropNameValue = document.getElementById(
          `tab_drop_field${i}-${j}`
        ).value;
      }
      if (tabShowValue == " in active" && j == 1) {
        tabShowValue = " in active";
      } else {
        tabShowValue = "";
      }
      tabDropIdValue = `${tabItemIdValue}_${j}`;
      tabLoopDropHead += `
<li><a data-target="#${tabDropIdValue}" data-toggle="${tabRadioValue}">${tabDropNameValue}</a></li>`;
      tabLoopDropBody += `<!--Start ${tabRadioValue} ${i}.${j} body "${tabDropIdValue}"--><div id="${tabDropIdValue}" class="tab-pane${tabFadeValue}${tabShowValue}">
<table><tr><td><p>Content for ${tabDropNameValue}</p></td></tr></table>
<!--End ${tabRadioValue} ${i}.${j} body "${tabDropIdValue}"--></div>
`;
    }
    tabLoopHead += `<!--Start ${tabRadioValue} ${i} head "${tabItemIdValue}"--><li${tabHeadClass}>
<a ${tabPillButton}${tabHeadClassDrop}data-toggle="${tabHeadToggle}" data-target="#${tabItemIdValue}"${tabTextCenter}>${tabNameValue}${tabImageSource}</a>${tabDropStart}${tabLoopDropHead}${tabDropEnd}
<!--End ${tabRadioValue} ${i} head "${tabItemIdValue}"--></li>
`;
    if (document.getElementById(`tab_drop_quantity${i}`).value == false) {
      tabLoopBody = `<!--Start ${tabRadioValue} ${i} body "${tabItemIdValue}"--><div id="${tabItemIdValue}" class="tab-pane${tabFadeValue}${tabShowValue}">
<table><tr><td><p>Content for ${tabNameValue}</p></td></tr></table>
<!--End ${tabRadioValue} ${i} body "${tabItemIdValue}"--></div>
`;
      tabLoopDropBody = "";
    } else {
      tabLoopBody = "";
    }
    tabBody += `${tabLoopBody}${tabLoopDropBody}`;
    tabLoopDropHead = "";
    tabLoopDropBody = "";
  }
  document.getElementById(
    "tab_code_box"
  ).value = `<!--Start ${tabRadioValue} set "${tabIdValue}"--><div id="${tabIdValue}" class="container">
<!--Start ${tabRadioValue} head(s) "${tabIdValue}"--><ul class="nav nav-${tabRadioValue}s${tabJustifiedValue}">
${tabLoopHead}<!--End ${tabRadioValue} head(s) "${tabIdValue}"--></ul>
<!--Start ${tabRadioValue} body(s) "${tabIdValue}"--><div class="tab-content">
${tabBody}<!--End ${tabRadioValue} body(s) "${tabIdValue}"--></div>
<!--End ${tabRadioValue} set "${tabIdValue}"--></div>`;
}
function copyTabCode() {
  const tabCopyText = document.getElementById("tab_code_box");
  tabCopyText.select();
  tabCopyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
