export class Custom_Date {
    today = new Date();

    // Get today's date
    getToday() {
        return this.today;
    }

    // Get today's date in string format
    getTodayString() {
        return this.today.toISOString().split("T")[0];
    }

    // Convert date to string
    toStringDate(date) {
        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return date.toISOString().split("T")[0];
    }

    // Get date two days after today
    getTwoDaysAfterToday() {
        const twoDaysAfterToday = new Date(this.today);
        twoDaysAfterToday.setDate(this.today.getDate() + 2);
        return twoDaysAfterToday;
    }

    twoDaysAfterTodayToString() {
        return this.toStringDate(this.getTwoDaysAfterToday());
    }

    GetTommorow() {
        const tommorow = new Date(this.today);
        tommorow.setDate(this.today.getDate() + 1);
        return tommorow;
    }

    tommorowToString() {
        return this.toStringDate(this.GetTommorow());
    }



}