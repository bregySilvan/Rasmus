



        /*
    class dragservice: 
        public canDrag(fromElement: IListElement, toElement: IListElement): boolean {

        }

            
        
        - Drag in redux::

        - Whenever an element is dragged



        
            the edit state plan:: 


        - elements to edit is passed to lists in general by @Input() 
        - Every editable thing is a subclass of IEDitabnleContainer which actually takes EditService and registers itself in element state
        - On UpdateElements in edit state, always available elements && boards is updated.
        - later on UpdateElements will be hook up point for implementing redo actions and shit.
        - GENERAL THING TO ALL ACTIONS AND STATE SHIT:::::::
            - Always make everything dependent on IElementState. So all other functionality can easily be modulated
            and with that it's simple to scale?
                So, i think of functionality, where every element can easily deleted or updated at any entry point. A structure
                which could be very cool:))))  
                Lets have a small example. We have to implement Undo functionality. It's an easy thing to just
                hook in on 'UPDATE_ELEMENTS_ACTION' from elements state and then just store all changes in array.
                Whenever a restore should be done it can be done by a index which points to current place in 
                undo state and then just use 'UPDATE_ELEMENTS_ACTION' to just undo shit. 
        */  