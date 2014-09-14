/**
 * Created by drago.jeremic on 9/9/14.
 */
$(function(){
    var hoursWrapper = $('.hours-wrapper');

    if(hoursWrapper && hoursWrapper != undefined && hoursWrapper.text() != ''){
        var text = jQuery.parseJSON(hoursWrapper.text());
        hoursWrapper.empty();
        hoursWrapper.show();
        for(var i = 0; i < text.length; i++){
            var line = '';
            switch (i){
                case 0:
                    line += 'Mon - ';
                    break;
                case 1:
                    line += 'Tue - ';
                    break;
                case 2:
                    line += 'Wed - ';
                    break;
                case 3:
                    line += 'Thu - ';
                    break;
                case 4:
                    line += 'Fri - ';
                    break;
                case 5:
                    line += 'Sat - ';
                    break;
                case 6:
                    line += 'Sun - ';
                    break;
            }

            if(text[i].isActive == true){
                line += '(';
                for(var j = 0; j < text[i].frames.length; j++) {
                    line += text[i].frames[j].timeFrom + " - " + text[i].frames[j].timeTill;
                    if(j < text[i].frames.length - 1){
                        line += ', '
                    }
                }
                line += ")</br/>"
            } else {
                line += 'Closed<br/>';
            }
            hoursWrapper.append(line);
        }
    }
});