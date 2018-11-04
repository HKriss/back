var con = document.querySelector('.con');
var sub = document.querySelector('.sub');
var BScroll = new BScroll('.wrap', {
    click: true
});
var xml = new XMLHttpRequest();
xml.open('get', '/api/back', true);
xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var data = JSON.parse(xml.responseText);
            if (data.code === 0) {
                var str = "";
                var html = `<ul class="list">`;
                for (var key in data.msg) {
                    html += `<h2 class=${key}>${key}</h2>`
                    data.msg[key].forEach(function(item) {
                        html += `<li>${item.name}</li>`;
                    });
                    str += `<p>${key}</p>`;
                }
                html += `</ul>`;
                con.innerHTML = html;
                sub.innerHTML = str;
                var ps = [...document.querySelectorAll('p')];
                for (var i = 0; i < ps.length; i++) {
                    ps[i].onclick = function(e) {
                        var txt = this.innerText;
                        BScroll.scrollToElement('.' + txt, 1000);
                    }
                }
            }
        }
    }
}
xml.send();