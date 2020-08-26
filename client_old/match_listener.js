function run () {
    document.dispatchEvent(new CustomEvent("create_match"));
    console.log("attempted to create event");
}