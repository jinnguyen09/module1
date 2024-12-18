class Mobile {
    constructor(name) {
        this.name = name;
        this.battery = 100;
        this.status = false;
        this.draftMessage = "";
        this.inbox = [];
        this.sentMessages = [];
    }

    togglePower() {
        this.status = !this.status;
        this.updateUI();
    }

    chargeBattery() {
        if (this.battery < 100) {
            this.battery = Math.min(100, this.battery + 10);
            this.updateUI();
        }
    }

    useBattery() {
        if (this.status) {
            this.battery--;
            if (this.battery <= 0) {
                this.battery = 0;
                this.status = false; // Auto power off
            }
            this.updateUI();
        }
    }

    draft(message) {
        if (this.status) {
            this.draftMessage = message;
            this.useBattery();
        } else {
            alert(`${this.name} is off!`);
        }
    }

    sendMessage(toMobile) {
        if (this.status) {
            if (this.draftMessage) {
                toMobile.receiveMessage(this.draftMessage, this.name);
                this.sentMessages.push(this.draftMessage);
                this.draftMessage = ""; // Clear draft
                this.useBattery();
                this.updateUI();
            } else {
                alert("No message to send!");
            }
        } else {
            alert(`${this.name} is off!`);
        }
    }

    receiveMessage(message, from) {
        if (this.status) {
            this.inbox.push({ message, from });
            this.useBattery();
            this.updateUI();
        }
    }

    viewInbox() {
        if (this.status) {
            const inboxElement = document.getElementById(`${this.name.toLowerCase()}-inbox`);
            inboxElement.innerHTML = this.inbox
                .map(msg => `<p><strong>${msg.from}:</strong> ${msg.message}</p>`)
                .join("") || "Inbox is empty.";
            this.useBattery();
        } else {
            alert(`${this.name} is off!`);
        }
    }

    updateUI() {
        document.getElementById(`${this.name.toLowerCase()}-battery`).textContent = this.battery;
        document.getElementById(`${this.name.toLowerCase()}-status`).textContent = this.status ? "On" : "Off";
    }
}

// Create instances of Mobile
const nokia = new Mobile("Nokia");
const iphone = new Mobile("iPhone");

// Define global functions for HTML buttons
function togglePower(name) {
    const mobile = name === "nokia" ? nokia : iphone;
    mobile.togglePower();
}

function chargeBattery(name) {
    const mobile = name === "nokia" ? nokia : iphone;
    mobile.chargeBattery();
}

function sendMessage(from, to) {
    const fromMobile = from === "nokia" ? nokia : iphone;
    const toMobile = to === "nokia" ? nokia : iphone;
    const draftMessage = document.getElementById(`${from}-draft`).value;
    fromMobile.draft(draftMessage);
    fromMobile.sendMessage(toMobile);
}

function viewInbox(name) {
    const mobile = name === "nokia" ? nokia : iphone;
    mobile.viewInbox();
}
