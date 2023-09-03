/*goal: create a menu to build different team, racers, and cars:
0. exit ("kachow my friend")
1. display all teams
2. create team
3. delete team
4. view individual team
    3a. exit
    3b. display all racers
    3c. create individual racers
    3d. delete indivdual racers
    3e. display all racers
        3d.0 exit
        3d.1 create car & brand (car class will be the parent class)
        3d.2 delete car & brand */
//---------------------------------------------------------------------------------//

class Car {
    constructor(brand, typeOfCar) {
        this.brand = brand;
        this.typeOfCar = typeOfCar;
    }
}
//parent class//

class Racer {
    constructor(racerName) {
        this.racerName = racerName;
        this.cars = [];
    }

    addCar(car) {
        if (car instanceof Car) {
            this.cars.push(car);
        } else {
            throw new Error(`${car} is not from the class Car. Please create new argument under Car.`);
        }
    }    
}

/*Racer is another class and car is an object under Cars but in class Racer;
in order to make a new car, racer has to be made first, but under the parent class Car*/

class RacingTeam {
    constructor(name) {
        this.name = name;
        this.racers = [];
    }

    addRacer(racer) {
        if (racer instanceof Racer) {
            this.racers.push(racer);
        } else {
             throw new Error(`${racer} is not from the class Racer. Please create new argument under Car.`)
        }
    }
}

//start of menu prompt coding//
class Menu {
    constructor() {
        this.racingTeams = [];
        this.selectedRacingTeam = null;
        //for the Main Menu arrays//
        this.racers = [];
        this.selectedRacer = null;
        //for the Racing Team sub-menu arrays//
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !=0) {
            switch(selection) {
                case '1':
                    this.displayAllRacingTeams();
                    break;
                case '2':
                    this.createNewRacingTeam();
                    break;
                case '3':
                    this.deleteRacingTeam();
                    break;
                case '4':
                    this.viewRacingTeam();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('KA-CHOW speedracer!');
    }

    showMainMenuOptions() {
        return prompt(`
        MAIN MENU
        *********************************************************
        0.) exit
        1.) display all racing teams
        2.) create new racing team
        3.) delete racing team
        4.) view racing team
        `);
    }

    //option 1 of Main Menu//
    displayAllRacingTeams() {
        let racingTeamString = '';
        for (let i = 0; i  < this.racingTeams.length; i++) {
            racingTeamString += i + '.) ' + this.racingTeams[i].name + '\n';
        }
        alert(racingTeamString);
    }


    //option 2 of Main Menu//
    createNewRacingTeam() {
        let teamName = prompt('Enter name for new racing team.');
        this.racingTeams.push(new RacingTeam(teamName));
    }

    //option 3 of Main Menu//
    deleteRacingTeam() {
        let index = prompt('Enter the index of the team you wish to delete.');
        if (index >= 0 && index < this.racingTeams.length) {
            this.racingTeams.splice(index, 1);
        }
    }

    //option 4 of Main Menu//
    viewRacingTeam() {
        let index = prompt('Enter the index of the team you wish to view.');
        let description = '';

        if (index >= 0 && index < this.racingTeams.length) {
            this.selectedRacingTeam = this.racingTeams[index];
            description = 'Team Name: ' + this.selectedRacingTeam.name + '\n';
        }
        //shows team name in Racing Team menu//

        for (let i = 0; i < this.selectedRacingTeam.racers.length; i++) {
            description += i + '.) ' + this.selectedRacingTeam.racers[i].racerName + '\n';
        }
        /*shows racers under team in Racing Team menu
            must create racer first, then leave Racing Team Menu
            after returning back to Racing Team Menu, racer will appear under team name*/

        let selection = this.showRacingTeamMenuOptions(description);
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.displayAllRacers();
                    break;
                case '2':
                    this.createNewRacer();
                    break;
                case '3':
                    this.deleteRacer();
                    break;
                case '4':
                    this.viewRacer();
                    break;
                default:
                    selection = 0;
                }
            selection = this.showRacingTeamMenuOptions(description);
            //this will return back to Racing Team Menu instead of Main Menu after selection unless selecting '0' to go back to Main Menu//
        }    
    }

    showRacingTeamMenuOptions(racingTeamInfo) {
        return prompt(`
        RACING TEAM MENU
        *********************************************************
        0) back
        1) display all racers
        2) create racer
        3) delete racer
        4) view racer
        *********************************************************
        ${racingTeamInfo}
        `);
    }

    //option 4.1 of Racing Team Menu//
    displayAllRacers() {
        let racerString = '';
        for (let i = 0; i < this.selectedRacingTeam.racers.length; i++) {
            racerString += i + '.) ' + this.selectedRacingTeam.racers[i].racerName + '\n';
        }
        alert(racerString);
    }

    //option 4.2 of Racing Team Menu//
    createNewRacer() {
        let racerName = prompt('Enter name for new racer.');
        this.selectedRacingTeam.racers.push(new Racer(racerName));
    }

    //option 4.3 of Racing Team Menu//
    deleteRacer() {
        let index = prompt('Enter the index of the racer you wish to delete.');
        if (index >= 0 && index < this.selectedRacingTeam.racers.length) {
            this.selectedRacingTeam.racers.splice(index, 1);
        }
    }

    //option 4.4 of Racing Team Menu//
    viewRacer() {
        let index = prompt('Enter the index of the racer you wish to view.');
        let description1 = ''; 
        if (index >= 0 && index < this.selectedRacingTeam.racers.length) {
            this.selectedRacer = this.selectedRacingTeam.racers[index];
            description1 = `Racer Name: ${this.selectedRacer.racerName}\n`
            //displays Racer name in Racer menu//

        for (let i = 0; i < this.selectedRacer.cars.length; i++) {
            description1 += i + '.) ' + this.selectedRacer.cars[i].brand 
            + ' ' + this.selectedRacer.cars[i].typeOfCar + '\n';
        }
         /*shows cars under team in Racer menu
            must create car first, then leave Racer Menu
            after returning back to Racer Menu, car will appear under racer name*/

    }

        let selection = this.showRacerMenuOptions(description1);
        
        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createNewCar();
                    break;
                case '2':
                    this.deleteCar();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showRacerMenuOptions(description1);
        }
        //this will return back to Racer Menu instead of Racing Team Menu or Main Menu after selection unless selecting '0' to go back to Racing Team Menu//
    }

    showRacerMenuOptions(carInfo) {
        return prompt(`
        RACER MENU
        *********************************************************
        0) back
        1) create car
        2) delete car
        *********************************************************
        ${carInfo}
        `);
    }
    
    createNewCar() {
        let brand = prompt('Enter the brand for new car.');
        let typeOfCar = prompt('Enter the type of car for new car.')
        this.selectedRacer.cars.push(new Car(brand, typeOfCar));
    }

    deleteCar() {
        let index = prompt('Enter the index of the car you wish to delete.');
        if (index >= 0 && index < this.selectedRacer.cars.length) {
            this.selectedRacer.cars.splice(index, 1);
        }
    }
}

//define and call function//
let menu = new Menu(); 
menu.start();