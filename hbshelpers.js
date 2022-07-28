module.exports = {
    json: function (data) {
        return JSON.stringify(data)
    },
    makeDateFromTs: function (data) {
        const date = new Date(data);
        const hour = date.getHours();
        const minute = date.getMinutes();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${hour}:${minute} ${day}.${month}.${year}`;
    },
    isSubstanceDanger(key){
        if(key == "id" || key=="name") return false
        else return true
    },
    renderImage(id){
        const idMapper = {
            0:"same",
            1:"low",
            2:"low_no_power",
            3:"low_power",
            4:"careful",
            5:"danger",
            6:"danger_of_life"
        }
        return `images/mixer/${idMapper[id]}.png`
    }
}