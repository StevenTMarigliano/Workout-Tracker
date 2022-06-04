class WorkoutTracker {
    static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];

        this.loadEntries();
        this.updateView();

        this.root.querySelector(".add_button").addEventListener("click", () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDay().toString().padStart(2, "0");

            this.addEntry({
                date: `${ year }-${ month }-${ day }`,
                workout: "walking",
                duration: 30,
                time: "seconds",
                distance: 0,
                unit: "miles"
                
            });
        });
    }

    static html() {
        return `
        <h1> Workout Tracker </h1>
             <table class="tracker">
        
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Workout</th>
                    <th>Duration</th>
                    <th></th>
                    <th>Distance</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="tracker_entries"></tbody>
        
                <tbody> 
                    <tr class="tracker_row-add">
                         <th></th>
                         <th></th>
                         <th></th>
                         <th></th>
                         <th></th>
                         <th></th>
                        <td>
                            <button type="button" class="add_button">Add Entry +</button>
                        </td>
                    </tr>
                    </tbody>
            
            </table>
        `;
    }

    static rowHtml() {
        return `
         <tr class="tracker_row">       
                
                    <td> 
                        <input type="Date" class="tracker_date">
                    </td>
                    
                    <td> 
                        <select class="tracker_workout">
                            <option value="walking">Walking</option>
                            <option 

value="jogging">Jogging</option>
                            <option 

value="running">Running</option>
                            <option value="cycling">Cycling</option>
                            <option value="swimming">Swimming</option>
                            <option value="climbing">Climbing</option>
                        </select>
                    </td>
                    
                    <td> 
                        <input type="number" class="tracker_duration">
                    </td>

                
                    <td> 
                        <select class="tracker_time">
                            <option value="seconds">Second(s)</option>
                            <option value="minutes">Minute(s)</option>
                            <option value="hours">Hour(s)</option>
                        </select>
                    </td>
                    
                    <td> 
                        <input type="number" class="tracker_distance">
                    </td>
                
                    <td> 
                        <select class="tracker_unit">
                            <option value="miles">Mile(s)</option>
                            <option value="kilometers">Kilometer(s)</option>
                            <option value="cycling">Feet</option>
                            <option value="swimming">Meter(s)</option>
                            <option value="climbing">Yard(s)</option>
                        </select>
                    </td>
                    
                    <td>
                        <button type="button" class="x_button">&times;</button>
                    </td>
                </tr>        
            `;
        }

    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
    }

    saveEntries() {
        localStorage.setItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".tracker_entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;

            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker_date").value = data.date;
            row.querySelector(".tracker_workout").value = data.workout;
            row.querySelector(".tracker_duration").value = data.duration;
            row.querySelector(".tracker_time").value = data.time;
            row.querySelector(".tracker_distance").value = data.distance;
            row.querySelector(".tracker_unit").value = data.unit;

            row.querySelector(".tracker_date").addEventListener("change", ({ target }) => {
                data.date = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker_workout").addEventListener("change", ({ target }) => {
                data.workout = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker_duration").addEventListener("change", ({ target }) => {
                data.duration = target.value;
                this.saveEntries();
            });
            
              row.querySelector(".tracker_time").addEventListener("change", ({ target }) => {
                data.time = target.value;
                this.saveEntries();
            });
            
              row.querySelector(".tracker_distance").addEventListener("change", ({ target }) => {
                data.distance = target.value;
                this.saveEntries();
            });
            
              row.querySelector(".tracker_unit").addEventListener("change", ({ target }) => {
                data.unit = target.value;
                this.saveEntries();
            });


            row.querySelector(".x_button").addEventListener("click", () => {
                this.deleteEntry(data);
            });

            tableBody.appendChild(row);
        };

        tableBody.querySelectorAll(".tracker_row").forEach(row => {
            row.remove();
        });

        this.entries.forEach(data => addRow(data));
    }

    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete) {
        this.entries = this.entries.filter(data => data !== dataToDelete);
        this.saveEntries();
        this.updateView();
    }
}

const app = document.getElementById("app");

const wt = new WorkoutTracker(app);

window.wt = wt;
