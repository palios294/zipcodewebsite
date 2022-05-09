$(document).ready(function () {
  $("#zipForm").submit(function(e) {
    e.preventDefault();
    var zip = $('.zipCode')
      .val()
      .replace(/\s+/g, '')

    var formattedZip = `${zip.slice(0,3)} ${zip.slice(-2)}`

    $.ajax({
      url: `https://api.zippopotam.us/CZ/${formattedZip}`,/* odkaz z sttranky a nastavit funkcie */ 
      data: {},
      success: function( result ) {
        let output = "";
          result.places.forEach(place => {
            output += `
                <div class="location-item">
                  <ul>
                    <li><strong>Mesto/Dedina: </strong> ${place["place name"]}</li>
                    <li><strong>Okres: </strong> ${place["state"]}</li>
                    <li><strong>Zemepisná dĺžka: </strong> ${place["longitude"]}</li>
                    <li><strong>Zemepisná šírka: </strong> ${place["latitude"]}</li>
                  </ul>
                </div>
                <br/><br/>
              `;
          });

          $('.result').html(output);
      },
      error: function(err) {
        console.warn('chyba: ', err);
      }
    });
  })
})


// // Show check or remove icon
// function showIcon(icon) {
//   // Clear icons
//   document.querySelector(".icon-remove").style.display = "none";
//   document.querySelector(".icon-check").style.display = "none";
//   // Show correct icon
//   document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
// }

// // Delete location box
// function deleteLocation(e) {
//   if (e.target.className == "delete") {
//     document.querySelector(".message").remove();
//     document.querySelector(".zip").value = "";
//     document.querySelector(".icon-check").remove();
//   }
// }