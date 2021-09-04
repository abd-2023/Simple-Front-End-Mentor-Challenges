function open_menu() {
    let nav_list_height = document.querySelector("#main-nav ul").offsetHeight;

    document.getElementById("main-nav").style.height = nav_list_height + "px";

    document.querySelector(".hamburger-icon").style.display = "none";

    document.querySelector(".close-menu").style.display = "block";

    // console.log("nav_list_height", nav_list_height);
}
function close_menu() {
    document.getElementById("main-nav").removeAttribute("style");

    document.querySelector(".hamburger-icon").removeAttribute("style");

    document.querySelector(".close-menu").removeAttribute("style");
    // console.log("close menu");
}


var bookmarkEle = document.querySelector(".bookmark");
bookmarkClasses = bookmarkEle.classList;

// checking the class present in local storage and giving that class to bookmark
var bookmarkClass = window.localStorage.getItem("bookmarkClass");
// console.log("bookmarkClass", bookmarkClass);
if (bookmarkClass == "bookmarked") {
    // console.log("not bookmarked");
    bookmark();
    // console.log("bookmarkClass", window.localStorage.getItem("bookmarkClass"));
}

//code for bookmarking or removing bookmark if present on project

function bookmark() {
    // console.log("before", bookmarkClasses);
    // bookmarking the page
    if (bookmarkClasses.contains("not-bookmarked")) {
        // console.log("not bookmarked");
        bookmarkClasses.remove("not-bookmarked");
        bookmarkClasses.add("bookmarked");
        window.localStorage.setItem("bookmarkClass", "bookmarked");
        document.querySelector(".bookmark").classList.add("bookmark-desk-bg");
        document.querySelector(".intro-bookmark").innerHTML = "Bookmarked";
        document.querySelector(".intro-bookmark").style.color = "var(--darkCyan)";
        // console.log("bookmarkClass", window.localStorage.getItem("bookmarkClass"));
    }
    //removing the bookmark if clicked again
    else {
        bookmarkClasses.remove("bookmarked");
        bookmarkClasses.add("not-bookmarked");
        document.querySelector(".bookmark").classList.remove("bookmark-desk-bg");
        // document.querySelector(".bookmark").removeAttribute("style");
        document.querySelector(".intro-bookmark").innerHTML = "Bookmark";
        document.querySelector(".intro-bookmark").removeAttribute("style");

        window.localStorage.setItem("bookmarkClass", "not-bookmarked");

        // console.log("bookmarkClass", window.localStorage.getItem("bookmarkClass"));
    }
    // console.log("after", bookmarkClasses);
}

var selectionModal = document.querySelector(".selection-modal");
var modal = document.querySelector(".modal");

//code for opening selection modal
function openSelectionModal() {
    // console.log("open-modal");

    modal.classList.add("modal-open");
    selectionModal.classList.remove("close-modal");
    selectionModal.classList.add("open-modal");
    document.querySelector("html").style.overflow = "hidden";

    //code for closing selection modal if clicked anywhere other than the it's child element
    window.onclick = function (event) {
        // console.log(event.target);
        if (event.target == selectionModal) {
            // console.log("modal parent");
            closeSelectionModal();
        }
    }
}

function closeSelectionModal() {
    modal.removeAttribute("style");
    modal.classList.remove("modal-open");
    setTimeout(() => {
        // console.log("Closing Modal");
        document.querySelector("html").removeAttribute("style");
        selectionModal.classList.remove("open-modal");
        selectionModal.classList.add("close-modal");
    }, 400);
}

// code for opening pledge choices in the modal
function openPledgeChoice(ele) {
    // console.log("ele", ele);
    // run this code only if pledge is not selected
    var pledgeSelect = ele.querySelector("input[name='pledge']").checked;

    if (!pledgeSelect) {
        var enterPledge = ele.querySelector(".enter-pledge");
        var enterPledges = document.querySelectorAll(".enter-pledge");
        var pledgeChoices = document.querySelectorAll("div.pledge-cards");
        ele.querySelector("input[name='pledge']").checked = true;

        for (let i = 0; i < pledgeChoices.length; i++) {
            pledgeChoices[i].removeAttribute("style");
            enterPledges[i].removeAttribute("style");
        }
        enterPledge.style.height = "101px";
        ele.style.border = "3px solid var(--moderateCyan)";
        setTimeout(() => {
            enterPledge.style.overflow = "initial";
        }, 200);
    }
}

// code for selecting reward in the modal from the about us section
function openReward(rewardId) {
    openSelectionModal(); //first opening the modal
    rewardSelected = document.getElementById(rewardId);
    rewardSelected.querySelector("input[name='pledge']").checked = true;
    setTimeout(() => {
        rewardSelected.scrollIntoView({ behavior: "smooth" });
        openPledgeChoice(rewardSelected); // selecting the appropriate reward
    }, 450);
}
var successModal = document.querySelector(".success-modal")

function filledReward(ele) {

    var pledgeValue = ele.previousElementSibling;
    var inpValue = parseInt(pledgeValue.querySelector('input').value);
    // console.log("pre sibling", pledgeValue, inpValue, typeof inpValue);

    // removing currency and commas from totalPledge and converting to number for calculation
    var totalPledge = parseInt(document.getElementById("total-pledge").innerText.replace(/[$,]+/g, ""));
    // console.log("totalPledge", totalPledge, typeof totalPledge);

    totalPledge += inpValue;
    console.log("totalPledge", totalPledge, typeof totalPledge);

    // calculating totalpledge to 100,000 max pledge by percent and adding to progress bar width
    var totalPledgePercent = Math.ceil(((totalPledge / 100000) * 100));
    console.log("totalPledgePercent", totalPledgePercent, typeof totalPledgePercent);

    document.querySelector("#progress-bar").setAttribute("value", totalPledgePercent);


    //converting totalPledge number to currency
    // totalPledge = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 5 }).format(totalPledge)
    totalPledge = totalPledge.toLocaleString("en-US");
    document.getElementById("total-pledge").innerHTML = totalPledge;

    // console.log("totalPledge", totalPledge);

    // increasing total backers by 1
    var totalBackers = parseInt(document.getElementById("totat-backers").innerHTML.replace(/[,]+/g, ""));
    // console.log("totalBackers", totalBackers);
    totalBackers += 1;
    // console.log("totalBackers", totalBackers);
    document.getElementById("totat-backers").innerHTML = totalBackers.toLocaleString("en-US");

    //first closing selection modal

    modal.removeAttribute("style");
    modal.classList.remove("modal-open");
    setTimeout(() => {
        // console.log("Closing Selection Modal");
        selectionModal.classList.remove("open-modal");
        selectionModal.classList.add("close-modal");

        successModal.classList.remove("success-modal-closed");
        successModal.classList.add("success-modal-opened");
    }, 400);
    //code for closing success modal if clicked anywhere other than the it's child element
    window.onclick = function (event) {
        // console.log(event.target);
        if (event.target == successModal) {
            closeSuccessModal();

        }
    }
}

//closing sucess Modal
function closeSuccessModal() {
    successModal.classList.add("success-modal-closed");
    successModal.classList.remove("success-modal-opened");
    document.querySelector("html").removeAttribute("style");

    // scrolling pledge stats section into view after closing success modal
    var pledgeStats = document.querySelector(".pledge-stats");
    pledgeStats.scrollIntoView({ behavior: "smooth" })
}


