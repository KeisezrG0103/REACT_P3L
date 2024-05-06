export class Poin {
    // Declare and initialize tanggalLahir
    tanggalLahir;

    constructor(tanggalLahir) {
        // Initialize tanggalLahir as a JavaScript Date object
        this.tanggalLahir = new Date(tanggalLahir);
    }

    // Static method to calculate points based on money
    static count(money) {
        let totalPoints = 0;

        // Calculate points based on the amount of money spent
        const pointsAndMoney = [
            { amount: 1_000_000, points: 200 },
            { amount: 500_000, points: 75 },
            { amount: 100_000, points: 15 },
            { amount: 10_000, points: 1 },
        ];

        for (const { amount, points } of pointsAndMoney) {
            const count = Math.floor(money / amount);
            totalPoints += count * points;
            money -= count * amount;
        }

        return totalPoints;
    }

    // Method to determine if today is within 3 days before or after the user's birthday
    doublePoints() {
        const today = new Date(); // Current date

        // Calculate this year's birthday
        const birthdayThisYear = new Date(
            today.getFullYear(),
            this.tanggalLahir.getMonth(),
            this.tanggalLahir.getDate()
        );

        // Calculate the difference in milliseconds between today and this year's birthday
        const diffInMilliseconds = Math.abs(today - birthdayThisYear);

        // Convert milliseconds to days
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        // Return true if within 3 days before or after the birthday, false otherwise
        return diffInDays <= 3;
    }
}