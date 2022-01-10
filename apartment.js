/* 
- we're gonna go ahead and create a menu driven app using prompts that allows us to manage units and familys in those 
units

*/


// create a resident class that holds the name of the unit and describe that family
class Resident {
    constructor(name, unit) {
        this.name = name;
        this.unit = unit;
    }

    describe () {
        return `s${this.name} plays ${this.unit}.`;
    }
    // print info about our family and their unit using template literal
    
}

// create the family
class Family{
    constructor(name) {
        this.name = name;
       
        this.familys = [];
        /* 
        - add an array to hold all the familys in that unit
        - when a new family is created; there will also be a blank array in a constructor
        */
    }

    /*
    - add a method ==> addResident(family){....}
    - this way someone can't pass a just a string/number
    - we're gonna add it to our array, therefore, we want to ensure that it is an actual family itself
        - using "instanceof"
    */
    addResident(family){
        if (family instanceof Resident) {
            this.familys.push(family)
            // this will push = method on the array
        } else {
            throw new Error(`You can only add an instance of Resident. Argument is not a family: ${family}`);
            // the error in this case is the exception
        }
    }


    /* 
    - add describe method
    - it will do the samething as it did in the family class
    */
    describe(){
        return `${this.name} has ${this.familys.length} familys.`;
    }
}

// create another class = the menu itself
    // it will drive the application & all the choices
class Menu {
    constructor(){ // no argument
        this.units = []; 
        /* 
        - initialize our units & leave array empty
        - can have multiple units inside the application
        */
        this.selectedFamily = null; 
        // when we start, no units are selected, therefore using "null"
        
    }

    start() { 
        // start() ---> almost the entry point to the application
        
        let selection = this.showMainMenuOptions();
        /*  
        - "top-down development approach" means:
            - we'll start using methods that don't exist yet to build out our menu by:
                - what we think it is going to look like
                - then implement those methods
        */


                
       while (selection != 0) {
        /*
        - a variable to get user input of what option in our menu the user has selected.
        - 0 = existing
        - creating switches will determine what the user selected and do something based off of it.
        */
            switch (selection){
                case '1':
                    this.createFamily();
                    break;
                case '2':
                    this.viewFamily();
                    break;
                case '3':
                    this.deleteFamily();
                    break;
                case '4':
                    this.displayFamilys();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
            /*
            - we'll want to place this line code "selection = this.showMainMenuOptions();" here again while the user is still inside of the loop.
            - keep looping as long as the user does not select zero or something other than 1-4.
            */
       }
       alert('Goodbye!'); 
        /*
        - this will alert the user if they did select zero
            - they are now outside of the loop
        */
    }
    /* 
    - this is the flow of the application
    - going to show the menu options that the user is going to select.
    */


    // will implement our methods that we were going to have/show the user.
   showMainMenuOptions(){ 
        return prompt(`
            0) exit
            1) create new family unit
            2) view unit
            3) delete unit
            4) display all units
        `);
       /* 
       - method to show prompt = a pop-up box of what the menu options (switches section) are that will ask the user for input.
       - return is the input that comes back from that prompt
       - used template literals and will not need to concatenate or use newline characters.
            - could place menu items on it and in the prompt, it will appear this way
        - based on what the user select, we will get that number back and do something
       */
   }

   // view a specific team
   showFamilyMenuOptions(unitInfo){
       return prompt(`
            0) back
            1) create family member
            2) delete family member
            -------------------
            ${unitInfo}
        `);
   }

   displayFamilys(){  
       let unitString = '';
       for (let i = 0; i < this.units.length; i++) { 
        unitString += i + ') ' + this.units[i].name + '\n';
       }
        /*
        - what this will do is:
            - grab each family
            - get the name for that specific family
            - add a new line so that all the family names will show up w/ an index numbering them w/ their name on a different line
            */
        alert(unitString); // to display all the units
   }
   createFamily() {
       let name = prompt('Enter name for new family unit:'); // prompt user to enter the name they want to use for the family
       this.units.push(new Family(name)); // creating a new instance of an object of a class and create a new array
   }

   viewFamily(){
       // to view the details of a specific family
       let index = prompt('Enter the index of the unit you wish to view:');
       if (index > -1 && index < this.units.length){
           /*
           - this if statement is going to do some validation here
           - if the family was less than zero or greater than the length of our units array = error
                - we dont want to validate the user input
                - because the users are unpredictable and may input anything in
                - this will avoid crashing and errors
           */
          this.selectedFamily = this.units[index];
          let description = 'Family Name: ' + this.selectedFamily.name + '\n';

          for (let i = 0; i < this.selectedFamily.familys.length; i++) {
              description += i + ') ' + this.selectedFamily.familys[i].name + ' - ' + this.selectedFamily.familys[i].unit + '\n';
              // this will build up the list of all the team familys and their unit
          }



          /*  to show the menu options: see line 190
        - "top-down development approach" means:
            - we'll start using methods that don't exist yet to build out our menu by:
                - what we think it is going to look like
                - then implement those methods
        */
          let selection = this.showFamilyMenuOptions(description);
          switch (selection){
              // this is a sub menu of the full menu **they are not the same**
            case '1':
                this.createResident();
                break;
            case '2':
                this.deleteResident();
                // no need to add a break here because nothing will come after this      
          }
       }
   }

   // delete family
   deleteFamily(){
        let index = prompt('Enter the index of the unit you wish to delete:');
        if (index > -1 && index < this.units.length) {
        this.units.splice(index, 1);
        }
   }

   createResident(){
       let name = prompt('Enter name for new family member:');
       let unit = prompt('Enter which family role does this new family member have:');
       this.selectedFamily.familys.push(new Resident(name,unit));
   }

   deleteResident(){
       let index = prompt('Enter the index of the family unit you wish to delete:');
       if (index > -1 && index < this.selectedFamily.familys.length){
           this.selectedFamily.familys.splice(index, 1);
       }
   }

}
 
/*
- we need to test this by creating an instance of our menu
*/

let menu = new Menu();
menu.start();
/*
- menu.start(); ---->
    - the method that shows everything

- make sure that if you are adding a new method
    - you are currently outside of any other method by checking the curly brackets and it is not w/in another method
*/