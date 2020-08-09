const renderLeagueStanding = result => {
    let standingUI = '';
    const standing =  result['standings'][0]['table'];

    standing.forEach(element => {
        let clubStanding = `
        <tr>
          <td>${element['position']}</td>
          <td>${element['team']['name']}</td>
          <td>${element['playedGames']}</td>
          <td>${element['won']}</td>
          <td>${element['draw']}</td>
          <td>${element['lost']}</td>
          <td>${element['goalDifference']}</td>
          <td>${element['points']}</td>
        </tr>
        `;
        standingUI = standingUI + clubStanding;
    });

    const renderStanding = document.getElementById('league-standings');
    renderStanding.innerHTML = standingUI;
}

export default renderLeagueStanding;