var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

  var orig = 1;
  $(document).ready(function () {
    var e = performance.now(),
      t = !1;
    if ("function" == typeof userReady) (t = !0), userReady();
    else {
      for (
        var o,
          n = gID("genreplace"),
          a = n.innerHTML.split(", "),
          s = a.length,
          r = '<div class="genresgrid form-check">',
          l = 0;
        l < s;
        l++
      )
        r += `<div><input class="form-check-input" type="checkbox" id="${(o = a[
          l
        ].replace(/\s/g, ""))}" value="${
          a[l]
        }">\n            <label class="form-check-label" for="${o}">${
          a[l]
        }</label></div>`;
      (r += "</div>"), (n.innerHTML = r), (n.style.visibility = "visible");
      var i,
        c = gID("yearselect");
      for (l = envYear; l >= seasonalMinYear; l--)
        ((i = document.createElement("option")).value = l),
          (i.text = l),
          c.appendChild(i);
      "Winter" === envSeason
        ? (seasonId = 0)
        : "Spring" === envSeason
        ? (seasonId = 1)
        : "Summer" === envSeason
        ? (seasonId = 2)
        : "Fall" === envSeason && (seasonId = 3),
        (gID("seasonselect").selectedIndex = seasonId);
      var d = gClass("timetext");
      (seasonaltmp = d[d.length - 1].innerHTML),
        $(".timetext").each(daterelative),
        $(".rating").each(normalizeScore);
    }
    document.addEventListener("scroll", function () {
      if (!lastwatchHidden) {
        (lastwatchHidden = !0),
          isMobile()
            ? $("#lastwatch").css("animation-name", "lastwatchoutmobile")
            : $("#lastwatch").css("animation-name", "lastwatchout");
        var e = gID("lastwatchclosebtn");
        e.classList.remove("glyphicon-remove"),
          e.classList.add("glyphicon-chevron-right"),
          e.setAttribute("onClick", "lastwatchExpand()");
      }
    }),
      (seasonal = gID("resultplace").innerHTML);
    var u,
      m,
      g,
      p,
      h = getrequest("q");
    if (
      (t
        ? (u = m = g = p = null)
        : ((u = getrequest("genre")),
          (m = getrequest("season")),
          (g = getrequest("year")),
          (p = getrequest("tab"))),
      null !== h && h.length < 300)
    ) {
      if (h.length < 2)
        return (
          window.history.replaceState("obj", webtitle, "/"),
          location.reload(),
          void shownotif("You are opening wrong page")
        );
      $(".searchbar").val(h);
      var f = getrequest("sengine");
      "gogo" === f
        ? searchE1()
        : "kaa" === f
        ? searchE3()
        : "4ani" === f
        ? searchE4()
        : "rush" === f
        ? searchE6()
        : "api" === f
        ? searchE7()
        : "amax" === f
        ? searchE9()
        : "al" === f
        ? searchE11()
        : "mal" === f
        ? searchMAL()
        : "all" === f
        ? ((useMAL = useE11 = !0), (sEngineAdd = "&sengine=all"), dosearch(h))
        : searchMAL();
    } else if (null !== u && !1 === /[^a-zA-Z, -]/.test(u)) {
      u.split(",").forEach((e) => {
        var t = e.replace(/\s/g, ""),
          o = gID(t);
        void 0 === notFoundID[t]
          ? (o.checked = !0)
          : "any" !== t &&
            (gClass(
              "genresgrid"
            )[0].innerHTML += `<div><input class="form-check-input" type="checkbox" id="${t}" value="${e}" checked>\n                <label class="form-check-label" for="${t}">${e}</label></div>`);
      });
	  
	  //^Search Function
      var v = getrequest("orderby");
      if (null !== v && "popular" !== v) {
        var y = ["any", "popular", "rating", "latest"];
        for (l = 0; l < 4; l++)
          y[l] === v &&
            ((gID("topsortselect").selectedIndex = l), (sortFilter = v));
      }
      generalsearch(u);
    } else
      null !== m
        ? (null === g && (g = envYear), openseasonal(g, m))
        : null !== g
        ? generalsearch("any")
        : t ||
          ("recent" === p
            ? showrecent()
            : "popular" === p
            ? showpopular()
            : "movie" === p
            ? showmovie()
            : "dub" === p
            ? showdub()
            : "updates" === p && showfollow(),
          (nextInterval = setInterval(function () {
            gID("featuredNext").click();
          }, 15e3)));
    t || renderUserCard(),
      checkloginhome(),
      t || weeklyrender(10),
      "ontouchstart" in window &&
        (document.addEventListener("touchstart", handleTouchStart, !1),
        document.addEventListener("touchmove", handleTouchMove, !1)),
      gID("enablechat").addEventListener("click", function () {
        (gID("enablechat").checked && discordNotOpened) || opendiscordforce
          ? shownotif("This feature already deprecated")
          : shownotif("Chat closed");
      });
    var b = null,
      w = -1;
    if (
      ($("#q").keyup(function (e) {
        if (
          (clearTimeout(b),
          "Enter" === e.key && quicksearchloaded
            ? ((quicksearchloaded = !1),
              w > -1
                ? gClass("qresulthover")[0].click()
                : ($("#searchbutton").click(),
                  $(".quicksearchcontainer").fadeOut(400),
                  setTimeout(function () {
                    gClass("quicksearchcontainer")[0].style.display = "none";
                  }, 400)))
            : e.target.value.length < 2
            ? (gClass("quickresult")[0].innerHTML = "")
            : e.target.value != querytemp &&
              ((quicksearchloaded = !1),
              (b = setTimeout(() => quicksearch(e.target.value), 400)),
              (w = -1)),
          quicksearchloaded)
        ) {
          var t = gClass("quickresult")[0].childNodes;
          "ArrowDown" === e.key && w < t.length - 1
            ? (-1 !== w && (t[w].className = null),
              (t[++w].className = "qresulthover"))
            : "ArrowUp" === e.key &&
              w > -1 &&
              ((t[w].className = null),
              -1 !== --w && (t[w].className = "qresulthover"));
        }
      }),
      $("#password").keyup(function (e) {
        "Enter" === e.key && $(".loginbtn").click();
      }),
      $("#confirmpass").keyup(function (e) {
        "Enter" === e.key && $(".changepassbtn").click();
      }),
      $("#confirm").keyup(function (e) {
        "Enter" === e.key && $(".registerbtn").click();
      }),
      $(".form-check-input").click(genreclick),
      window.innerWidth > 1720)
    ) {
      var I = document.createElement("img");
      (I.src = cdn + "/s/mascot.png"),
        I.setAttribute("id", "mascot"),
        document.body.appendChild(I);
    }
    if (isStorage("localStorage")) {
      var k = localStorage.getItem("lastopen"),
        D = localStorage.getItem("lasttitle");
      if (null !== k && null !== D && !lastwatchHidden && !t) {
        var T = "1";
        if ((D = D.replace(" - AniMixPlay", "")).includes(" Episode")) {
          var x = D.split(" Episode");
          (T = x[1]), (D = x[0]);
        }
        var S = Number(localStorage.getItem("lasttime"));
        if (
          (gID("lastwatchlink").setAttribute("href", k),
          (gID("lastwatchtitle").innerHTML =
            '<i class="glyphicon glyphicon-play"></i> ' +
            escapeHtml(D) +
            " Episode " +
            T),
          (gID("lastwatchurl").innerHTML = " watched " + daterelative2(S, !0)),
          (gID("lastwatch").style.display = "block"),
          isMobile())
        )
          $("#lastwatch").css("animation-name", "movein2mobilerecomend");
        else {
          $("#lastwatch").css("animation-name", "lastwatchspawn"),
            (lastwatchHidden = !0);
          var L = gID("lastwatchclosebtn");
          L.classList.remove("glyphicon-remove"),
            L.classList.add("glyphicon-chevron-right"),
            L.setAttribute("onClick", "lastwatchExpand()");
        }
      }
    }
    if (((gID("topsortselect").selectedIndex = 1), !isMobile())) {
      var M = window.document.createElement("div");
      (M.id = "backtotopbtn"),
        M.addEventListener("click", scrollToTop),
        (M.style.opacity = "0"),
        (M.innerHTML = '<i class="glyphicon glyphicon-menu-up"></i>'),
        document.body.appendChild(M);
      var E = !0;
      document.addEventListener("scroll", function () {
        window.scrollY > 50 && E
          ? ((E = !1), (M.style.opacity = "1"))
          : window.scrollY < 50 && !E && ((E = !0), (M.style.opacity = "0"));
      });
    }
    var C = performance.now();
    console.log(
      "%cAniMixPlay",
      "font-size:35px;font-family:'Lexend deca',sans-serif;color:#7fc3ff;text-shadow:3px 3px #0b0b0b",
      "console"
    ),
      console.log("tech info : https://animixplay.to/about.html"),
      console.log(
        "%c Initial render time : " + (C - e) + "ms",
        "background: #222; color: #7eff4f"
      );
  });
  var autoReload = !0,
    timeOnLoad = new Date();
  document.addEventListener("visibilitychange", function () {
    if (
      void 0 !== document.hidden &&
      !document.hidden &&
      "" === location.search &&
      "/" === location.pathname &&
      autoReload
    ) {
      var e = new Date().getTime() - timeOnLoad.getTime();
      console.log("document age: " + e + "ms"), e > 3e5 && location.reload();
    }
  });
  var nextInterval,
    featuredData = [],
    triedFeat = !1;
  function loadFeatured(e = 0) {
    if (!triedFeat) {
      var t = new XMLHttpRequest();
      t.open("GET", "/assets/s/featured.json"),
        (t.timeout = 15e3),
        (t.onload = function () {
          200 === this.status &&
            isJson(t.responseText) &&
            ((featuredData = JSON.parse(t.responseText)),
            showFeatured(e, !1),
            (triedFeat = !0));
        }),
        t.send();
    }
  }
  var ImgPreload = [];
  function showFeatured(e, t = !0) {
    if (featuredData.length < 1 && t) loadFeatured(e);
    else if (!(featuredData.length < 1)) {
      curFeatured > e && clearInterval(nextInterval);
      var o = featuredData.length - 1;
      e < 0 ? (e = o) : e > o && (e = 0);
      var n = e + 1,
        a = e - 1;
      a < 0 ? (a = o) : n > o && (n = 0),
        void 0 === ImgPreload[n] &&
          (ImgPreload[n] = new Image().src = featuredData[n].img),
        void 0 === ImgPreload[a] &&
          (ImgPreload[a] = new Image().src = featuredData[a].img),
        (curFeatured = e);
      var s = featuredData[e];
      gID(
        "featuredcard"
      ).innerHTML = `<div id="featuredbgcont">\n    <img id="featuredbg" src="${s.img}"/>\n</div>\n<div id="featuredcont">\n    <a href="${s.url}"><img id="featuredimg" src="${s.img}"/></a>\n    <div id="featuredtitle">\n        <a href="${s.url}">${s.title}</a>\n    </div>\n    <div id="featuredtext">${s.desc}</div>\n    <div id="featuredgenre"><i class="glyphicon glyphicon-tag"></i> ${s.genre}</div>\n    <a id="featuredNext" onClick="showFeatured(curFeatured + 1)"><i class="glyphicon glyphicon-chevron-right"></i></a>\n    <a id="featuredBack" onClick="showFeatured(curFeatured - 1)"><i class="glyphicon glyphicon-chevron-left"></i></a>\n</div>`;
    }
  }
  function lastwatchExpand() {
    (lastwatchHidden = !1),
      isMobile()
        ? $("#lastwatch").css("animation-name", "lastwatchinmobile")
        : $("#lastwatch").css("animation-name", "lastwatchin");
    var e = gID("lastwatchclosebtn");
    e.classList.remove("glyphicon-chevron-right"),
      e.classList.add("glyphicon-remove"),
      e.setAttribute("onClick", "lastwatchclose()");
  }
  function lastwatchclose() {
    localStorage.removeItem("lastopen"),
      localStorage.removeItem("lasttitle"),
      isMobile()
        ? $("#lastwatch").css("animation-name", "moveout2mobilerecomend")
        : $("#lastwatch").css("animation-name", "moveout2recomend"),
      setTimeout(function () {
        gID("lastwatch").style.display = "none";
      }, 600);
  }
  const baseURL = "/",
    cdn = "https://cachecow.eu",
    ap = "/a/XsWgdGCnKJfNvDFAM28EV",
    ap2 = "/a/3KjJkx2RVQu1zeXQnrZWc",
    search = "/api/search",
    usrap = "/api/usr",
    webtitle = "AniMixPlay - Watch HD Anime for Free",
    loadmoremsg =
      'You reach the end.<br>Use <a href="javascript:void(0)" onClick="focussearch();" >search</a> to find other anime',
    loadmoreicon = '<i class="glyphicon glyphicon-menu-down"></i> Load more',
    searchresulthtml =
      '<ul class="searchresult"></ul><div id="bottommsg"></div>';
  var discordNotOpened = !0,
    opendiscordforce = !1,
    lastwatchHidden = !1;
  if (void 0 === envYear) var envYear = 2020;
  if (void 0 === envSeason) var envSeason = "Winter";
  var seasonId = -1,
    seasonalMinYear = 1980;
  const absoluteMinYear = 1915;
  var seasonal, dubhtml, movie, popular, recent, schedule, followhtml;
  function showall() {
    console.log("Back home"),
      window.history.replaceState("object or string", webtitle, "/"),
      null != seasonal &&
        ($(".nav li").removeClass("active"),
        $("#allbtn").addClass("active"),
        $("#resultplace").html(seasonal));
  }
  function showmovie() {
    console.log("Load virtual page Movie"),
      $(".nav li").removeClass("active"),
      $("#moviebtn").addClass("active"),
      window.history.replaceState("object or string", webtitle, "/?tab=movie"),
      null == movie
        ? ($("#resultplace").html(searchresulthtml),
          $("#loadingtext").css("display", "block"),
          loadmovie())
        : $("#resultplace").html(movie);
  }
  function showdub() {
    console.log("Load virtual page Dub"),
      $(".nav li").removeClass("active"),
      $("#dubbtn").addClass("active"),
      window.history.replaceState("object or string", webtitle, "/?tab=dub"),
      null == dubhtml
        ? ($("#resultplace").html(searchresulthtml),
          $("#loadingtext").css("display", "block"),
          loaddub())
        : $("#resultplace").html(dubhtml);
  }
  function showpopular() {
    console.log("Load virtual page Popular"),
      $(".nav li").removeClass("active"),
      $("#popularbtn").addClass("active"),
      window.history.replaceState(
        "object or string",
        webtitle,
        "/?tab=popular"
      ),
      null == popular
        ? ($("#resultplace").html(searchresulthtml),
          $("#loadingtext").css("display", "block"),
          loadpopular())
        : $("#resultplace").html(popular);
  }
  function showrecent() {
    console.log("Load virtual page Recent"),
      $(".nav li").removeClass("active"),
      $("#recentbtn").addClass("active"),
      window.history.replaceState("object or string", webtitle, "/?tab=recent"),
      null == recent
        ? ($("#resultplace").html(searchresulthtml),
          $("#loadingtext").css("display", "block"),
          loadrecent())
        : $("#resultplace").html(recent);
  }
  function showfollow() {
    console.log("Load virtual page Follow"),
      $(".nav li").removeClass("active"),
      $("#followedbtn").addClass("active"),
      window.history.replaceState(
        "object or string",
        webtitle,
        "/?tab=updates"
      ),
      null == followhtml
        ? ($("#resultplace").html(searchresulthtml),
          $("#loadingtext").css("display", "block"),
          loadfollow())
        : $("#resultplace").html(followhtml);
  }
  function loadmovie(e = "99999999") {
    var t = $(".searchresult").html();
    $.ajax({
      url: search,
      type: "POST",
      data: { movie: e },
      success: function (e) {
        $(".searchresult").html(t + buildlist(e.result)),
          (movietmp = e.last),
          e.more
            ? $("#bottommsg").html(
                '<div id="loadmorelist" OnClick="loadmoremovie();">' +
                  loadmoreicon +
                  "</div>"
              )
            : $("#bottommsg").html(loadmoremsg),
          (movie = gID("resultplace").innerHTML);
      },
      error: loadmoreError,
      complete: loadmoreComplete,
      timeout: 2e4
    });
  }
  function loaddub(e = "3020-05-06 00:00:00") {
    var t = $(".searchresult").html();
    $.ajax({
      url: search,
      type: "POST",
      data: { seasonaldub: e },
      success: function (e) {
        $(".searchresult").html(t + buildlist(e.result)),
          (dubtmp = e.last),
          e.more
            ? $("#bottommsg").html(
                '<div id="loadmorelist" OnClick="loadmoredub();">' +
                  loadmoreicon +
                  "</div>"
              )
            : $("#bottommsg").html(loadmoremsg),
          (dubhtml = gID("resultplace").innerHTML);
      },
      error: loadmoreError,
      complete: loadmoreComplete,
      timeout: 2e4
    });
  }
  function loadpopular(e = 999) {
    (void 0 !== popular && popular.includes('<div style="margin')) ||
      (gID("resultplace").innerHTML =
        '<div style="margin:-10px 10px 15px 20px;padding:2px;background-color:#202020;text-align:center;">Top Weekly - <a href="/?genre=any&orderby=popular">Top All Time</a></div>' +
        gID("resultplace").innerHTML),
      ($dest = 999 === e ? "popular" : "popularfull"),
      $.ajax({
        url: "/assets/popular/" + $dest + ".json",
        type: "GET",
        success: function (t) {
          $(".searchresult").html(buildlist(t.result)),
            (populartmp = 99),
            999 === e
              ? $("#bottommsg").html(
                  '<div id="loadmorelist" OnClick="loadmorepopular();">' +
                    loadmoreicon +
                    "</div>"
                )
              : $("#bottommsg").html(
                  'End of weekly top.<br>Go <a href="#" onClick="showall();" >home</a> for recent release'
                ),
            (popular = gID("resultplace").innerHTML);
        },
        error: loadmoreError,
        complete: loadmoreComplete,
        timeout: 15e3
      });
  }
  function loadrecent(e = "3020-05-06 00:00:00") {
    var t = $(".searchresult").html(),
      o = search;
    "3020-05-06 00:00:00" === e && (o = ap),
      $.ajax({
        url: o,
        type: "POST",
        data: { recent: e },
        success: function (e) {
          $(".searchresult").html(t + buildlist(e.result)),
            (recenttmp = e.last),
            e.more
              ? $("#bottommsg").html(
                  '<div id="loadmorelist" OnClick="loadmorerecent();">' +
                    loadmoreicon +
                    "</div>"
                )
              : $("#bottommsg").html(loadmoremsg),
            (recent = gID("resultplace").innerHTML);
        },
        error: loadmoreError,
        complete: loadmoreComplete,
        timeout: 2e4
      });
  }
  function loadnewep(e = "3020-05-06 00:00:00") {
    var t = $(".searchresult").html();
    $.ajax({
      url: search,
      type: "POST",
      data: { seasonal: e },
      success: function (e) {
        $(".searchresult").html(t + buildlist(e.result)),
          (seasonaltmp = e.last),
          e.more
            ? $("#bottommsg").html(
                '<div id="loadmorelist" OnClick="loadmorenewep();">' +
                  loadmoreicon +
                  "</div>"
              )
            : $("#bottommsg").html(loadmoremsg),
          (seasonal = gID("resultplace").innerHTML);
      },
      error: loadmoreError,
      complete: loadmoreComplete,
      timeout: 2e4
    });
  }
  function loadfollow(e = "3020-05-06 00:00:00") {
    var t = "yes";
    if (
      (isStorage("localStorage") && (t = localStorage.getItem("isAuth")),
      "no" === t)
    )
      return (
        (gID("bottommsg").innerHTML =
          "Sign in required to follow anime release."),
        void loadmoreComplete()
      );
    var o = $(".searchresult").html();
    $.ajax({
      url: ap2,
      type: "POST",
      data: { showfollowed: e },
      success: function (t) {
        $(".searchresult").html(o + t.result),
          (followtmp = t.last),
          t.more
            ? $("#bottommsg").html(
                '<div id="loadmorelist" OnClick="loadmorefollow();">' +
                  loadmoreicon +
                  "</div>"
              )
            : "3020-05-06 00:00:00" === e
            ? ($("#bottommsg").html(
                'Follow <span style="color: #7dff59;">on-going</span> anime to add it to this list.<br>This place tracking new episode only, for watchlist go to <a href="' +
                  gClass("linkpersonal")[0].href +
                  '">user panel</a>.'
              ),
              $("#bottommsg").css("opacity", "0.8"))
            : ((gID("bottommsg").innerHTML =
                "Removing anime here won't remove it from watchlist.<br>This place tracking new episode only, for watchlist go to <a href=\"" +
                gClass("linkpersonal")[0].href +
                '">user panel</a>.'),
              (gID("bottommsg").style.opacity = "0.8")),
          $.ajax({
            url: "/assets/s/schedule.json",
            type: "GET",
            success: function (e) {
              scheduleJSON = e;
            },
            complete: function () {
              $(".countdowntxt").each(formatCountdown),
                $(".name a").each(movedubtofront),
                (followhtml = gID("resultplace").innerHTML);
            }
          }),
          (followhtml = gID("resultplace").innerHTML);
      },
      error: function (e) {
        if (isJson(e.responseText)) {
          var o = JSON.parse(e.responseText);
          o.error.includes("Login") &&
            "yes" === t &&
            (isStorage("localStorage") &&
              (localStorage.setItem("usrCache", "refresh"),
              localStorage.setItem("isAuth", "no")),
            shownotif("Session end"),
            location.reload()),
            (gID("bottommsg").innerHTML = o.error),
            (followhtml = '<div id="bottommsg">' + o.error + "</div>");
        } else gID("bottommsg").innerHTML = "Network error";
      },
      complete: loadmoreComplete,
      timeout: 2e4
    });
  }
  var movietmp,
    dubtmp,
    populartmp,
    recenttmp,
    generaltmp,
    followtmp,
    seasonaltmp,
    plannedtmp,
    finishedtmp,
    ptwtmp,
    loadmoreComplete = function () {
      (gID("loadingtext").style.display = "none"),
        setTimeout(() => {
          gID("removeanimcss").remove();
        }, 1e3);
    },
    loadmoreError = function (e) {
      isJson(e.responseText)
        ? shownotif(JSON.parse(e.responseText).error)
        : shownotif("Network error");
      gID("bottommsg").innerHTML = tmpBottomMsg;
    };
  function unfollow(e, t) {
    var o = gID(t),
      n = "anime";
    null !== o && (n = o.innerHTML.split('title="')[1].split('">')[0]),
      callconfirm(
        "Unfollow <span class='anitexttitle'>" + n + "</span> ?",
        function () {
          e.setAttribute("onClick", ""),
            (e.style.cursor = "default"),
            $.ajax({
              url: ap,
              type: "POST",
              data: { unfollow: t },
              success: function (e) {
                setTimeout(function () {
                  $(o).fadeOut("normal"), shownotif("Unfollowed", 2e3);
                }, 100);
              },
              error: function (o) {
                (e.setAttribute("onClick", 'unfollow(this, "' + t + '")'),
                (e.style.cursor = "pointer"),
                isJson(o.responseText))
                  ? shownotif(JSON.parse(o.responseText).error)
                  : shownotif("Network error");
              },
              timeout: 1e4
            });
        }
      );
  }
  var tmpBottomMsg = "Network error";
  function defaultactions() {
    if (
      ((tmpBottomMsg = gID("bottommsg").innerHTML),
      (gID("loadmorelist").innerHTML = "Loading..."),
      gID("loadmorelist").setAttribute("OnClick", ""),
      (gID("loadmorelist").style.cursor = "default"),
      null === document.getElementById("removeanimcss"))
    ) {
      var e = document.createElement("style");
      (e.innerHTML = ".searchresult li, .items li{animation:zoomout 0s;}"),
        e.setAttribute("id", "removeanimcss"),
        document.body.appendChild(e);
    }
  }
  function loadmorefollow() {
    defaultactions(), loadfollow(followtmp);
  }
  function loadmorenewep() {
    defaultactions(), loadnewep(seasonaltmp);
  }
  function loadmoremovie() {
    defaultactions(), loadmovie(movietmp);
  }
  function loadmoredub() {
    defaultactions(), loaddub(dubtmp);
  }
  function loadmorepopular() {
    defaultactions(), loadpopular(populartmp);
  }
  function loadmorerecent() {
    defaultactions(), loadrecent(recenttmp);
  }
  function loadmoregeneral() {
    defaultactions(),
      (genre = getrequest("genre")),
      generategeneral(genre, generaltmp);
  }
  function loadmoreWatchHistory() {
    defaultactions(), loadWatchHistory(watchhistorytmp);
  }
  function loadmorePlanned() {
    defaultactions(), loadPlanned(plannedtmp);
  }
  function loadmorePTW() {
    defaultactions(), loadPTW(ptwtmp);
  }
  function loadmoreFinished() {
    defaultactions(), loadFinished(finishedtmp);
  }
  var querytemp = "";
  function focussearch() {
    isMobile() ? togglesearch() : gID("q").focus();
  }
  function dosearchfromindex() {
    var e = $("#q").val();
    e.length > 300
      ? shownotif("Keyword too long!")
      : searchlimiter
      ? shownotif("Search not yet ready")
      : e.length > 2 && "" !== e.trim()
      ? ((gID("readmorebtn").style.display = "none"),
        (gID("announcement").style.display = "none"),
        (gID("featuredcard").style.display = "none"),
        (gID("navtab").style.display = "none"),
        (gID("openschedulebtn").style.display = "none"),
        (gID("genresortbtn").style.display = "none"),
        (gID("seasontopnav").style.display = "none"),
        dosearch(e))
      : shownotif("Keyword too short!");
  }
  function backhome() {
    "" != seasonal && "" != window.location.search
      ? (scrollToTop(600),
        (gID("resultplace").innerHTML = seasonal),
        window.history.pushState("object or string", webtitle, "/"),
        (document.title = webtitle),
        "undefined" != typeof ga &&
          (ga("set", "page", "/"), ga("send", "pageview")),
        (sortFilter = "popular"),
        $(".searchbar").val(""),
        (gID("resultAlt").style.display = "none"),
        $(".noresultnotif").css("display", "none"),
        (gID("featuredcard").style.display = "block"),
        (gID("announcement").style.display = "block"),
        (gID("readmorebtn").style.display = "block"),
        (gID("navtab").style.display = "block"),
        isMobile() || (gID("openschedulebtn").style.display = "block"),
        $("#resultplace").css("padding", ""),
        $(".nav li").removeClass("active"),
        $("#allbtn").addClass("active"),
        (gID("genresortbtn").style.display = "none"),
        (gID("seasonselect").selectedIndex = seasonId),
        (gID("yearselect").selectedIndex = 0),
        (gID("seasontopnav").style.display = "none"),
        (gID("typeselect").selectedIndex = 0),
        (gID("langselect").selectedIndex = 0),
        (gID("topsortselect").selectedIndex = 1),
        $("#genreplace input").each(function () {
          this.checked = !1;
        }))
      : (window.history.replaceState("object or string", webtitle, "/"),
        location.reload());
  }
  function searchfocused() {
    $(".quicksearchcontainer").fadeIn(150),
      (gID("coverlight").style.zIndex = "8");
  }
  function searchblur() {
    setTimeout(function () {
      "A" != document.activeElement.tagName &&
        "LI" != document.activeElement.tagName &&
        ($("#coverlight").fadeOut(150),
        $(".quicksearchcontainer").fadeOut(150));
    }, 50);
  }
  window.onpopstate = function (e) {
    window.location.href.includes("#") || backhome();
  };
  var quicksearchloaded = !1;
  function quicksearch(e) {
    (querytemp = e),
      $(".quicksearchcontainer").css("display", "block"),
      e.length > 1
        ? ($("#coverlight").fadeIn(300),
          $.ajax({
            url: cdn + "/api/search",
            type: "POST",
            data: { qfast: e, root: location.hostname },
            success: function (e) {
              "" === e.result &&
                (e.result =
                  '<a href="javascript:searchfull()">Use full search &gt;</a>'),
                $(".quickresult").html(e.result),
                $(".name").each(movedubtofront);
            },
            error: function () {
              $(".quickresult").html("");
            },
            complete: function () {
              setTimeout(() => {
                quicksearchloaded = !0;
              }, 500);
            },
            timeout: 1e4
          }))
        : $(".quickresult").html("");
  }
  var sEngineAdd = "";
  function searchE1() {
    (useE1 = useSpecific = !0),
      (useE2 = useE3 = useE4 = useE9 = useE6 = useE7 = useE11 = !1),
      (sEngineAdd = "&sengine=gogo"),
      dosearchfromindex();
  }
  function searchE4() {
    searchMAL();
  }
  function searchE6() {
    (useE6 = useSpecific = !0),
      (useE1 = useE2 = useE3 = useE4 = useE9 = useE7 = useE11 = !1),
      (sEngineAdd = "&sengine=rush"),
      dosearchfromindex();
  }
  function searchE7() {
    (useE7 = useSpecific = !0),
      (useE1 = useE2 = useE3 = useE4 = useE9 = useE6 = useE11 = !1),
      (sEngineAdd = "&sengine=api"),
      dosearchfromindex();
  }
  function searchE11() {
    (useE11 = useSpecific = !0),
      (useE1 = useE2 = useE3 = useE4 = useE6 = useE7 = useE9 = !1),
      (sEngineAdd = "&sengine=al"),
      dosearchfromindex();
  }
  function searchMAL() {
    (useMAL = useSpecific = useAMX = !0),
      (useE1 = useE2 = useE3 = useE4 = useE9 = useE6 = useE7 = useE11 = !1),
      (sEngineAdd = "&sengine=mal"),
      dosearchfromindex();
  }
  function searchfull() {
    (useE1 = useE2 = useE3 = useE4 = useE9 = useE6 = useMAL = !0),
      (useE11 = useE7 = useSpecific = !1),
      dosearchfromindex();
  }
  var useE1 = (useE2 = useE3 = useE4 = useE9 = useE6 = useAMX = !0),
    useMAL = (useE11 = useSpecific = useE7 = !1),
    searchlimiter = !1;
  function dosearch(e) {
    if (searchlimiter) shownotif("Search not yet ready");
    else if (e.length > 2) {
      if (
        ((searchlimiter = !0),
        setTimeout(function () {
          searchlimiter = !1;
        }, 1e4),
        console.log('Paralel search "' + e + '"'),
        $("#q").blur(),
        (gID("loadcontainer").style.display = "block"),
        (e = e.split("+").join(" ")),
        scrollToTop(600),
        (document.title = e + " - AniMixPlay"),
        window.history.pushState(
          "object or string",
          e + " - AniMixPlay",
          "?q=" + encodeURIComponent(e) + sEngineAdd
        ),
        (sEngineAdd = ""),
        "undefined" != typeof ga &&
          (ga("set", "page", "?q=" + e), ga("send", "pageview")),
        (gID("searchbutton").disabled = !0),
        $(".searchbar").val(e),
        (gID("resultplace").innerHTML =
          '<div id="result1"></div> <div id="result4"></div>'),
        (gID("resultAlt").style.display = "block"),
        (gID("resultAlt").innerHTML =
          '<div id="resultm"></div> <div id="result7"></div> <div id="result11"></div> <div id="result9"></div> <div id="result8"></div> <div id="result6"></div>'),
        useAMX &&
          $.ajax({
            url: cdn + "/api/search",
            type: "POST",
            data: { qfast: e, root: location.hostname },
            success: function (e) {
              if ("" !== e.result) {
                var t =
                  '<div class="loadmoresearch2">GOGO 2</div><ul class="items">' +
                  e.result +
                  "</ul>";
                (gID("result4").innerHTML = t), $(".name").each(movedubtofront);
              }
            },
            timeout: 1e4
          }),
        useE1
          ? $.ajax({
              url: getapURL(1),
              type: "POST",
              data: {
                q2: e,
                origin: orig,
                root: location.hostname,
                d: "gogoanime.gg"
              },
              success: function (t) {
                t.result.includes("Try search using") ||
                  ((gID("result1").innerHTML =
                    '<div class="loadmoresearch">GOGO</div>' + t.result),
                  $(".name a").each(movedubtofront)),
                  (document.title = e + " - AniMixPlay");
              },
              error: function (e) {
                if (isJson(e.responseText)) {
                  var t = "<br>" + JSON.parse(e.responseText).error;
                  gID("result1").innerHTML = t;
                } else {
                  t = "<br>Network error";
                  gID("result1").innerHTML = t;
                }
              },
              complete: function () {
                setTimeout(function () {
                  gID("searchbutton").disabled = !1;
                }, 3e3),
                  (gID("loadcontainer").style.display = "none");
              },
              timeout: 15e3
            })
          : setTimeout(function () {
              setTimeout(function () {
                gID("searchbutton").disabled = !1;
              }, 3e3),
                useSpecific ||
                  setTimeout(function () {
                    gID("result1").innerHTML =
                      '<div class="loadmoresearch">GOGO</div><a class="loadsearchbtn" onClick="searchE1()">Load GOGO</a>';
                  }, 500),
                (gID("loadcontainer").style.display = "none");
            }, 1500),
        useE9)
      )
        "no" === (t = "no") && !0 !== useSpecific && (useMAL = !0);
      if (useE6) {
        var t = "no";
        isStorage("localStorage") && (t = localStorage.getItem("isAuth")),
          "no" === t && !0 !== useSpecific
            ? ((useMAL = !0),
              setTimeout(function () {
                gID("result6").innerHTML =
                  '<div class="loadmoresearch">RUSH</div><a class="loadsearchbtn" onClick="searchE6()">Load RUSH</a>';
              }, 1e3))
            : setTimeout(function () {
                $.ajax({
                  url: getapURL(6),
                  type: "POST",
                  data: { q: e, origin: orig, root: location.hostname },
                  success: function (e) {
                    var t =
                      '<div class="loadmoresearch2">RUSH</div>' + e.result;
                    (t = t.replace(
                      new RegExp('class="searchimg"', "g"),
                      'class="srchimg"'
                    )),
                      (gID("result6").innerHTML = t),
                      $(".name a").each(movedubtofront);
                  },
                  timeout: 15e3
                });
              }, 500);
      }
      if (
        (useE7 &&
          $.ajax({
            url: cdn + "/api/search",
            type: "POST",
            data: { apistream: e, root: location.hostname },
            success: function (e) {
              if ('<ul class="searchresult"></ul>' !== e.result) {
                var t = '<div class="loadmoresearch2">API</div>' + e.result;
                (gID("result7").innerHTML = t),
                  $(".name a").each(movedubtofront);
              }
            },
            timeout: 1e4
          }),
        useE11)
      ) {
        t = "no";
        isStorage("localStorage") && (t = localStorage.getItem("isAuth")),
          "no" === t && !0 !== useSpecific
            ? ((useMAL = !0),
              setTimeout(function () {
                gID("result11").innerHTML =
                  '<div class="loadmoresearch">AL</div><a class="loadsearchbtn" onClick="searchE11()">Load AL</a>';
              }, 1e3))
            : $.ajax({
                url:
                  "https://v11.jt822rupt6miiuc7pq8wwf237.workers.dev/",
                type: "POST",
                data: { q: e, root: location.hostname },
                success: function (e) {
                  if ('<ul class="searchresult"></ul>' !== e.result) {
                    var t = '<div class="loadmoresearch2">AL</div>' + e.result;
                    (gID("result11").innerHTML = t),
                      $(".name a").each(movedubtofront);
                  }
                },
                timeout: 1e4
              });
      } else
        useSpecific ||
          setTimeout(function () {
            gID("result11").innerHTML =
              '<div class="loadmoresearch">AL</div><a class="loadsearchbtn" onClick="searchE11()">Load AL</a>';
          }, 1e3);
      useMAL &&
        ((gID("resultm").innerHTML =
          '<div class="loadmoresearch2">MAL</div><ul class="searchresult"><br><br>Loading...</ul></div>'),
        useSpecific && useE4,
        (limit = 6),
        $.ajax({
          url:
            "https://api.jikan.moe/v4/search/anime?q=" +
            encodeURIComponent(e) +
            "&limit=" +
            limit,
          type: "GET",
          success: function (e) {
            for (var t, o = [], n = e.results.length, a = 0; a < n; a++)
              "Rx" !== e.results[a].rated &&
                (null !== e.results[a].start_date
                  ? (t = new Date(e.results[a].start_date).getFullYear()) >
                      2030 && (t -= 100)
                  : (t = "Unknown"),
                (o[a] = {
                  title: e.results[a].title,
                  url: "/anime/" + e.results[a].url.split("anime/")[1],
                  picture: e.results[a].image_url,
                  score: 100 * e.results[a].score,
                  infotext: t + " " + e.results[a].type
                }));
            var s =
              '<div class="loadmoresearch2">MAL</div><ul class="searchresult">' +
              buildlist(o) +
              "</ul>";
            gID("resultm").innerHTML = s;
          },
          error: function (e) {
            if (isJson(e.responseText)) {
              var t = JSON.parse(e.responseText);
              gID("resultm").innerHTML = t.message;
            } else
              6 === limit
                ? (gID("resultm").innerHTML =
                    '<div style="margin-left:20px;">API offline / Network error<br><a href="javascript:searchMAL()">Retry</a></div>')
                : (gID("resultm").innerHTML =
                    '<div style="margin-left:20px;">API offline / Network error<br>- <a href="javascript:searchMAL()">Retry</a><br><br>- <a href="javascript:searchE1()">use GOGO</a></div>');
          },
          timeout: 15e3
        }),
        (useMAL = !1));
    }
  }
  function genreclick() {
    var e = "";
    $(".form-check-input:checked").each(function () {
      e += "," + this.value;
    }),
      "" !== e ||
      "0" != $("#typeselect").val() ||
      "any" !== $("#langselect").val() ||
      ("popular" !== sortFilter && "any" !== sortFilter)
        ? ("" !== e && (e = e.substr(1)), generalsearch(e))
        : backhome();
  }
  function typechange() {
    var e = window.location.search,
      t = $("#typeselect").val(),
      o = getrequest("genre");
    e.includes("engine=")
      ? (e = e.replace("engine=" + getrequest("engine"), "engine=" + t))
      : e.includes("?")
      ? (e += "&engine=" + t)
      : (e += "?engine=" + t),
      window.history.pushState("object or string", "AniMixPlay", e),
      generalsearch(o);
  }
  function langchange() {
    var e = window.location.search,
      t = $("#langselect").val(),
      o = getrequest("genre");
    e.includes("lang=")
      ? (e = e.replace("lang=" + getrequest("lang"), "lang=" + t))
      : e.includes("?")
      ? (e += "&lang=" + t)
      : (e += "?lang=" + t),
      window.history.pushState("object or string", "AniMixPlay", e),
      generalsearch(o);
  }
  function generalsearch(e) {
    if (
      ("" === e || null === e ? (e = "any") : genreExpanded || expandgenre(),
      /[^a-zA-Z, +-]/.test(e))
    )
      shownotif("Invalid Genre");
    else {
      var t = "?genre=" + e,
        o = e.replace(/,/g, " + "),
        n = getrequest("engine");
      if (null != n) {
        if ((n = Number(n)) < 12 && n > -1) {
          var a = new Array(12);
          (a[0] = ""),
            (a[1] = "GOGO"),
            (a[2] = "AUE"),
            (a[3] = "KAA"),
            (a[4] = "4ANI"),
            (a[5] = "9ANI"),
            (a[6] = "RUSH"),
            (a[7] = "API"),
            (a[8] = "MATO"),
            (a[9] = "AMAX"),
            (a[10] = "GDP"),
            (a[11] = "AL"),
            (o += " " + a[n]),
            (t += "&engine=" + n);
        } else shownotif("Invalid stream type");
      }
      var s = getrequest("lang");
      ("sub" !== s && "dub" !== s && "any" !== s) ||
        ((o += " " + s), (t += "&lang=" + s));
      var r = getrequest("orderby");
      if (null != r) {
        var l = r.charAt(0).toUpperCase() + r.slice(1);
        "Rating" === l && (l = "Best"),
          (o = l + " " + o),
          (t += "&orderby=" + r);
      } else
        "popular" === sortFilter &&
          ((o = "Popular " + o), (t += "&orderby=" + sortFilter));
      o.includes("any") && (o = o.replace(new RegExp("any", "g"), "")),
        o.includes("CGDCT") &&
          (o = o.replace("CGDCT", "Cute Girls Doing Cute Things")),
        null !== gID("readmorebtn") &&
          ((gID("readmorebtn").style.display = "none"),
          (gID("announcement").style.display = "none"),
          (gID("featuredcard").style.display = "none"),
          (gID("navtab").style.display = "none"),
          (gID("openschedulebtn").style.display = "none")),
        window.history.pushState("object or string", o + " - AniMixPlay", t),
        "undefined" != typeof ga &&
          (ga("set", "page", t), ga("send", "pageview")),
        (gID("resultAlt").style.display = "none"),
        (gID("searchbutton").disabled = !0),
        (gID("genresortbtn").style.display = "block"),
        (gID("seasontopnav").style.display = "none"),
        scrollToTop(700),
        (document.title = o + " - AniMixPlay"),
        (gID("resultplace").innerHTML =
          "<div class='genretitle'>" +
          escapeHtml(o) +
          "</div>" +
          searchresulthtml),
        (gID("loadingtext").style.display = "block"),
        console.log("Request virtual page " + o),
        generategeneral(e),
        isMobile() &&
          !0 === mobilemenuopen &&
          ($(".rightside").css("animation-name", "moveout2mobile"),
          (mobilemenuopen = !1));
    }
  }
  var generatelocked = !1;
  function generategeneral(e, t = "") {
    if (generatelocked)
      shownotif("Don't spam click!"),
        loadmoreComplete(),
        (gID("searchbutton").disabled = !1),
        (gID("topsortselect").selectedIndex = -1);
    else {
      var o = performance.now();
      "any" != e && (e = e.split("+").join(" "));
      var n = { genre: e, minstr: t };
      "any" !== sortFilter &&
        ((n.orderby = sortFilter),
        "" === t &&
          (n.minstr =
            "latest" === sortFilter ? "3020-05-06 00:00:00" : 99999999));
      var a = getrequest("year");
      if (null != a) {
        if ((a = parseInt(a)) < 1915 || a > envYear)
          return (
            $(".searchresult").html("Invalid year"),
            (gID("searchbutton").disabled = !1),
            void (gID("loadingtext").style.display = "none")
          );
        n.year = a;
      }
      var s = getrequest("engine");
      null != s && (n.engine = s);
      var r = getrequest("lang");
      null != r && (n.lang = r);
      var l = $(".searchresult").html();
      generatelocked = !0;
      var c = document.getElementsByTagName("input");
      for (i = 0; i < c.length; i++) c[i].disabled = !0;
      $.ajax({
        url: search,
        type: "POST",
        data: n,
        success: function (e) {
          e.more
            ? $("#bottommsg").html(
                '<div id="loadmorelist" OnClick="loadmoregeneral();">' +
                  loadmoreicon +
                  "</div>"
              )
            : $("#bottommsg").html("No more."),
            $(".searchresult").html(l + buildlist(e.result)),
            (generaltmp = e.last);
        },
        error: function (e) {
          if (isJson(e.responseText)) var t = JSON.parse(e.responseText).error;
          else t = "Network error";
          $(".searchresult").html(l + t);
        },
        complete: function () {
          (gID("searchbutton").disabled = !1),
            loadmoreComplete(),
            setTimeout(function () {
              for (generatelocked = !1, i = 0; i < c.length; i++)
                c[i].disabled = !1;
            }, 1e3);
          var e = performance.now();
          console.log(
            "%c Load time : " + (e - o) + "ms",
            "background: #222; color: #7eff4f"
          );
        },
        timeout: 15e3
      });
    }
  }
  var filter = 0;
  function seasonFilterChange() {
    var e = gID("topfilterselect").value;
    (filter = "new" === e ? 1 : "continuing" === e ? 2 : 0),
      openseasonal(curYear, curSeason);
  }
  var curSeason,
    curYear,
    sortFilter = "popular";
  function filterSortChange() {
    sortFilter = gID("topsortselect").value;
    var e = window.location.search;
    e.includes("orderby=") && "any" !== sortFilter
      ? (e = e.replace(getrequest("orderby"), sortFilter))
      : e.includes("?") && "any" !== sortFilter
      ? (e += "&orderby=" + sortFilter)
      : "any" !== sortFilter
      ? (e += "?orderby=" + sortFilter)
      : (e = e.replace("orderby=" + getrequest("orderby"), "")),
      window.history.pushState("object or string", "AniMixPlay", e),
      genreclick();
  }
  function seasonGo() {
    var e = gID("seasonselect").value;
    openseasonal(gID("yearselect").value, e);
  }
  function openseasonal(e = envYear, t = envSeason) {
    if (generatelocked)
      return shownotif("Don't spam click!"), void reEnableNextPrev();
    var o = ["Winter", "Spring", "Summer", "Fall"];
    if (o.includes(t)) {
      var n = o.indexOf(envSeason) + 1,
        a = envYear;
      if (
        (n > 3 && ((n = 0), (a = envYear + 1)),
        (e = Number(e)) < 1915 || e > a || isNaN(e))
      )
        shownotif("Invalid year");
      else {
        e !== a || (t !== o[n] && "Fall" !== t)
          ? (gID("nextseasonbtn").style.display = "block")
          : (gID("nextseasonbtn").style.display = "none");
        for (var s = 0; s < 4; s++)
          o[s] === t && (gID("seasonselect").selectedIndex = s);
        e > seasonalMinYear && (gID("yearselect").selectedIndex = envYear - e),
          (curSeason = t),
          (curYear = e);
        var r = `?year=${e}&season=${t}`,
          l = t + " " + e;
        null !== gID("readmorebtn") &&
          ((gID("readmorebtn").style.display = "none"),
          (gID("announcement").style.display = "none"),
          (gID("featuredcard").style.display = "none"),
          (gID("navtab").style.display = "none"),
          (gID("openschedulebtn").style.display = "none")),
          window.history.pushState("object or string", l + " - AniMixPlay", r),
          "undefined" != typeof ga &&
            (ga("set", "page", r), ga("send", "pageview")),
          (gID("resultAlt").style.display = "none"),
          (gID("searchbutton").disabled = !0),
          (gID("genresortbtn").style.display = "none"),
          (gID("seasontopnav").style.display = "block"),
          scrollToTop(700),
          (document.title = l + " - AniMixPlay"),
          (gID("resultplace").innerHTML =
            "<div class='genretitle'>" +
            escapeHtml(l) +
            "</div>" +
            searchresulthtml),
          (gID("loadingtext").style.display = "block"),
          console.log("Request virtual page " + l),
          loadseasonal(0),
          isMobile() &&
            ($(".rightside").css("animation-name", "moveout2mobile"),
            (mobilemenuopen = !1));
      }
    } else shownotif("Invalid season");
  }
  function loadseasonal(e = 0) {
    var t,
      o = curSeason.toLowerCase(),
      n = gClass("searchresult")[0].innerHTML,
      a = 30,
      s = performance.now();
    generatelocked = !0;
    var r = document.getElementsByTagName("input");
    for (i = 0; i < r.length; i++) r[i].disabled = !0;
    $.ajax({
      url: `/assets/season/${curYear}/${o}.json`,
      type: "GET",
      success: function (s) {
        if (void 0 !== s.anime) {
          var r,
            l = [],
            i = Object.values(s.anime);
          i.sort(function (e, t) {
            return e.members > t.members ? -1 : e.members < t.members ? 1 : 0;
          });
          for (
            var c = i.length, d = e;
            d < c &&
            (!0 === i[d].r18 ||
              (1 === filter && i[d].continuing) ||
              (2 === filter && !i[d].continuing) ||
              ((r = i[d].image_url.includes("images/anime")
                ? cdn + "/min/mal" + i[d].image_url.split("images/anime")[1]
                : i[d].image_url),
              (l[d] = {
                title: escapeHtml(i[d].title),
                url: escapeHtml("/anime/" + i[d].url.split("anime/")[1]),
                picture: escapeHtml(r),
                score: 100 * i[d].score
              }),
              null === i[d].type && (i[d].type = ""),
              i[d].continuing
                ? 2 === filter
                  ? (null !== i[d].airing_start &&
                      i[d].airing_start.includes("-") &&
                      ((date = i[d].airing_start.split("-")),
                      (tmp = Number(date[1])),
                      tmp > 9
                        ? (o = "Fall " + date[0])
                        : tmp > 6
                        ? (o = "Summer " + date[0])
                        : tmp > 3
                        ? (o = "Spring " + date[0])
                        : tmp > 0 && (o = "Winter " + date[0])),
                    (l[d].infotext = escapeHtml(`${o} ${i[d].type}`)))
                  : (l[d].infotext = escapeHtml(i[d].type))
                : (l[d].infotext = `${curSeason} ${curYear} ${i[d].type}`),
              (t = d + 1),
              !(--a < 1)));
            d++
          );
          (gID("bottommsg").innerHTML =
            a < 1
              ? `<div id="loadmorelist" OnClick="defaultactions();loadseasonal(${t})">${loadmoreicon}</div>`
              : ""),
            (gClass("searchresult")[0].innerHTML = n + buildlist(l));
        } else gClass("searchresult")[0].innerHTML = n + "No anime yet";
      },
      error: function (e) {
        if (isJson(e.responseText)) var t = JSON.parse(e.responseText).error;
        else t = "No anime yet";
        $(".searchresult").html(n + t);
      },
      complete: function () {
        (gID("searchbutton").disabled = !1),
          loadmoreComplete(),
          setTimeout(function () {
            for (generatelocked = !1, i = 0; i < r.length; i++)
              r[i].disabled = !1;
            reEnableNextPrev();
          }, 500);
        var e = performance.now();
        console.log(
          "%c Load time : " + (e - s) + "ms",
          "background: #222; color: #7eff4f"
        );
      },
      timeout: 15e3
    });
  }
  function reEnableNextPrev() {
    var e = gID("nextseasonbtn"),
      t = gID("prevseasonbtn");
    e.setAttribute("onClick", "seasonNext()"),
      (e.style.cursor = "pointer"),
      t.setAttribute("onClick", "seasonPrev()"),
      (t.style.cursor = "pointer");
  }
  function seasonNext() {
    gID("nextseasonbtn").setAttribute("onClick", ""),
      (gID("nextseasonbtn").style.cursor = "default");
    var e,
      t = curYear;
    if ("Winter" === curSeason) e = "Spring";
    else if ("Spring" === curSeason) e = "Summer";
    else if ("Summer" === curSeason) e = "Fall";
    else {
      if (!("Fall" === curSeason && t <= envYear))
        return void shownotif("No next season yet");
      (e = "Winter"), (t += 1);
    }
    openseasonal(t, e);
  }
  function seasonPrev() {
    gID("prevseasonbtn").setAttribute("onClick", ""),
      (gID("prevseasonbtn").style.cursor = "default");
    var e,
      t = curYear;
    if ("Fall" === curSeason) e = "Summer";
    else if ("Summer" === curSeason) e = "Spring";
    else if ("Spring" === curSeason) e = "Winter";
    else {
      if (!("Winter" === curSeason && t > 1916))
        return void shownotif("No more previous season");
      (e = "Fall"), (t -= 1);
    }
    openseasonal(t, e);
  }
  function checkloginhome() {
    if ("undefined" != typeof autoopen && !0 === autoopen)
      return (
        isStorage("localStorage") && localStorage.setItem("usrCache", "logout"),
        void onLoggedout()
      );
    var e = !1;
    if (isStorage("localStorage")) {
      var t = localStorage.getItem("usrCache");
      "refresh" === t
        ? (e = !0)
        : "logout" === t
        ? onLoggedout()
        : null !== t && isJson(t)
        ? onLoggedin((t = JSON.parse(t)))
        : (e = !0);
    } else e = !0;
    e &&
      $.ajax({
        url: usrap,
        type: "POST",
        data: { cek: "y" },
        success: function (e) {
          if (e.hasOwnProperty("code")) {
            if (isStorage("localStorage")) {
              var t = JSON.stringify(e.code);
              localStorage.setItem("uCode", t);
            } else handleCode(e.code);
            delete e.code;
          }
          if (e.hasOwnProperty("no") && "ok" === e.no)
            isStorage("localStorage") &&
              localStorage.setItem("usrCache", "logout"),
              onLoggedout();
          else if (e.hasOwnProperty("username")) {
            if (isStorage("localStorage")) {
              var o = JSON.stringify(e);
              localStorage.setItem("usrCache", o);
            }
            onLoggedin(e);
          } else {
            var n = gClass("loadingreplacement")[0];
            (n.style.color = "white"), (n.innerHTML = "API error");
          }
        },
        error: function (e) {
          var t = "Network error";
          isJson(e.responseText) && (t = JSON.parse(e.responseText).error);
          var o = gClass("loadingreplacement")[0];
          (o.style.color = "white"), (o.innerHTML = t);
        },
        timeout: 15e3
      });
  }
  function onLoggedin(e) {
    if (((autotrack = e.autotracking), 1 === e.premium)) {
      var t = " 👑";
      if (null != e.expire) {
        var o = new Date().getTime(),
          n = new Date(e.expire.replace(" ", "T") + "+00:00").getTime(),
          a = Math.round((n - o) / 1e3);
        t += ` <span id="timeleft">(${(a = Math.ceil(a / 86400))} days)</span>`;
      }
      gID("premiumcrown").innerHTML = t;
    }
    if ((showuserpanel(e.username), isStorage("localStorage"))) {
      var s = localStorage.getItem("uCode");
      if (null !== s && isJson(s)) {
        var r = JSON.parse(s);
        1 !== e.premium && handleCode(r);
      } else localStorage.setItem("usrCache", "refresh");
      localStorage.setItem("isAuth", "yes");
    }
    var l = gClass("usercard")[0];
    (l.style.display = "block"),
      $(".loadingreplacement").css("display", "none"),
      (gID("statuslogin").innerHTML = ""),
      window.location.pathname.includes("/user")
        ? ("yes" === getrequest("changename") &&
            (openchangepass(), isMobile() && showmobilemenu()),
          21 !== e.username.length ||
            isNaN(e.username) ||
            (gID("alretinfo2").style.display = "none"))
        : isMobile() || (l.parentNode.style.borderBottom = "1px solid #3c3c3c");
  }
  function onLoggedout() {
    if (
      ($("#loginform").fadeIn("slow"),
      (gID("gsignsection").style.display = "block"),
      isStorage("localStorage"))
    ) {
      var e = localStorage.getItem("uCode");
      if (null !== e && isJson(e)) handleCode(JSON.parse(e));
      else localStorage.setItem("usrCache", "refresh");
      localStorage.setItem("isAuth", "no");
    }
    $(".usercard").css("display", "block"),
      $(".loadingreplacement").css("display", "none");
  }
  var authwindow,
    codeLoaded = !1;
  function handleCode(e) {
    if (!codeLoaded)
      if (((codeLoaded = !0), "12" == e.ver)) {
        var t = gID("topmid");
        if (void 0 === notFoundID.topmid) {
          if ("object" == typeof e.load2)
            for (var o = e.load2, n = 0; n < o.length; n++) {
              var a = document.createElement("script");
              0 === o[n].indexOf("//") ? (a.src = o[n]) : (a.innerHTML = o[n]),
                document.head.appendChild(a);
            }
          if (void 0 !== e.pc) {
            (t.style =
              "display:block;margin: 0 0 20px 0;width:100%;background-color:rgb(34,34,34);"),
              (t.innerHTML =
                '<i class="xclose glyphicon glyphicon-remove" onclick="closeTopMid()"></i><div id="topmidcont"></div>');
            var s = gID("topmidcont");
            (s.style.clear = "both"),
              window.innerWidth < 728
                ? ((s.innerHTML = e.box), (extrascript = e.scrbox))
                : ((s.innerHTML = ""), (extrascript = ""));
            var r = document.createElement("script");
            (r.innerHTML = extrascript),
              s.appendChild(r),
              t.scrollHeight < 30 && t.remove();
          }
        }
      } else
        isStorage("localStorage") &&
          (localStorage.setItem("usrCache", "refresh"),
          localStorage.removeItem("uCode"),
          checkloginhome());
  }
  function closeTopMid() {
    gID("topmid").remove();
  }
  function renderUserCard() {
    gClass("usercard")[0].innerHTML =
      '<div id="userpanel">\n    <span class="usernameplace"></span><span id="premiumcrown"></span><br><br>\n    <div id="iconmenu">\n        <a class="linkpersonal glyphicon glyphicon-th-list" href=""><br><span class="subtextmenuicon">User Panel</span></a>\n        <i class="autotrackbtn glyphicon glyphicon-refresh" onClick="autotrackbtnclick();"><br><span class="subtextmenuicon">Autotracking</span></i>\n        <i class="glyphicon glyphicon-off" onClick="logout();"><br><span class="subtextmenuicon">Logout</span></i>\n    </div>\n    <div id="logoutmsg"></div>\n</div>\n<div id="loginform">\n    <div class="flexrightcard">\n        <div class="halfleft">\n            <input class="logininput" placeholder="Username" id="username" type="text" autocomplete="username"/>\n            <input class="logininput" placeholder="Password" id="password" type="password" autocomplete="current-password"/>\n            <input type="checkbox" value="" id="rememberme" checked>\n            <label class="form-check-label rememberlabel" for="rememberme">\n            Remember me\n            </label>\n        </div>\n        <div class="halfright">\n            <div class="loginbtn" onClick="login();">Login</div>\n            <a class="openregisterbtn" onClick="openregister();">Register</a>\n        </div>\n    </div>\n    <div id="statuslogin"></div>\n</div>\n<form id="registerform">\n    <a class="openloginbtn" onClick="backlogin();">&lt; back</a><br><br>\n    <span id="alretinfo">Note: we don\'t use email (no reset password), to avoid forgot please use password manager</span>\n    <div id="formregister">\n        <input class="logininput" placeholder="Username" id="usernameregis" type="text" autocomplete="off"/>\n        <div class="formsubtext">letters/numbers/_.-| max 25 chars</div>\n        <input class="logininput" placeholder="Password" id="passwordregis" type="password" autocomplete="off"/>\n        <div class="formsubtext">any 4 - 200 chars</div>\n        <input class="logininput" placeholder="Confirm Password" id="confirm" type="password" autocomplete="off"/>\n        <div class="formsubtext">retype password</div>\n        <div class="g-recaptcha" data-theme="dark" data-sitekey="6LfYUUceAAAAAEC5G8ZmQEqELhXx55thJrVKDrew"></div>\n    </div>\n    <div id="statusregister"></div>\n    <div class="registerbtn" onClick="register();">Register</div>\n</form>\n</div>';
  }
  function connectGoogle() {
    var e = gID("gconnectbtn"),
      t = e.innerHTML,
      o =
        "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=309353198480-dcg47docr6tnaf8hnc8cstfnaiisqgk4.apps.googleusercontent.com&scope=openid%20email&redirect_uri=https%3A//" +
        location.hostname +
        "/auth/google&prompt=select_account";
    if (
      (location.hostname.includes(".win") && (o += "&state=urlwin"),
      -1 !== document.cookie.indexOf("authstatus=done") &&
        (document.cookie =
          "authstatus=done;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT"),
      (authwindow = window.open(o, "authwindow", "width=500,height=600")),
      (e.innerHTML = "Waiting authorization..."),
      null !== authwindow)
    )
      var n = setInterval(function () {
        -1 !== document.cookie.indexOf("authstatus=done")
          ? (clearInterval(n),
            authwindow.close(),
            (gID("gsignsection").style.display = "none"),
            localStorage.setItem("usrCache", "refresh"),
            isStorage("localStorage") && !window.location.href.includes("/user")
              ? ((gID("statuslogin").innerHTML =
                  '<span class="successmsg">Success login</span>'),
                checkloginhome(),
                (e.innerHTML = t))
              : location.reload())
          : authwindow.closed && (clearInterval(n), (e.innerHTML = t));
      }, 500);
    else e.innerHTML = "Your browser not allow popup";
  }
  var autotrack = !0;
  function autotrackbtnclick() {
    $(".autotrackbtn").attr("onClick", ""),
      $(".autotrackbtn").css("cursor", "default"),
      autotrack
        ? $(".autotrackbtn").css("color", "gray")
        : $(".autotrackbtn").css("color", ""),
      toogleautotracking();
  }
  function toogleautotracking() {
    (autotrack = !autotrack),
      $.ajax({
        url: usrap,
        type: "POST",
        data: { autotrack: autotrack },
        success: function (e) {
          if (
            (shownotif(
              (autotrack = e.autotracking)
                ? "Autotracking ON"
                : "Autotracking OFF"
            ),
            isStorage("localStorage"))
          ) {
            var t = localStorage.getItem("usrCache");
            if (null !== t && "logout" !== t && isJson(t)) {
              (t = JSON.parse(t)).autotracking = autotrack;
              var o = JSON.stringify(t);
              localStorage.setItem("usrCache", o);
            }
          }
        },
        error: function (e) {
          isJson(e.responseText)
            ? shownotif(JSON.parse(e.responseText).error)
            : shownotif("Network error");
        },
        complete: function (e) {
          setTimeout(function () {
            $(".autotrackbtn").attr("onClick", "autotrackbtnclick()"),
              $(".autotrackbtn").css("cursor", "pointer");
          }, 5e3);
        },
        timeout: 15e3
      });
  }
  function showuserpanel(e) {
    $(".linkpersonal").attr("href", "/user/" + e),
      e.length > 20 &&
        !1 === /[^0-9]/.test(e) &&
        (e += ' [ <a href="/user/' + e + '?changename=yes">edit</a> ]'),
      $("#userpanel").fadeIn("slow"),
      $(".usernameplace").html(e),
      $("#loginform").css("display", "none"),
      $("#registerform").css("display", "none"),
      autotrack
        ? $(".autotrackbtn").css("color", "")
        : $(".autotrackbtn").css("color", "gray");
  }
  function login() {
    if ("" == $("#username").val() || $("#password").val().length < 4)
      shownotif("Please fill the required text");
    else {
      $(".loginbtn").attr("onClick", ""),
        $(".loginbtn").css("cursor", "default"),
        $(".loginbtn").html("Login...");
      var e = "no";
      $("#rememberme").is(":checked") && (e = "yes"),
        $.ajax({
          url: usrap,
          type: "POST",
          data: {
            username: $("#username").val(),
            login: window.btoa($("#password").val()),
            remember: e
          },
          success: function (e) {
            if (isStorage("localStorage")) {
              var t = JSON.stringify(e);
              localStorage.setItem("usrCache", t);
            }
            (gID("statuslogin").innerHTML =
              '<span class="successmsg">Success login with username ' +
              e.username +
              "</span>"),
              window.location.href.includes("/user")
                ? location.reload()
                : setTimeout(function () {
                    onLoggedin(e);
                  }, 1e3),
              $("#gsignsection").css("display", "none");
          },
          error: function (e) {
            if (isJson(e.responseText)) {
              var t = JSON.parse(e.responseText);
              gID("statuslogin").innerHTML =
                '<span class="errormsg">' + t.error + "</span>";
            } else
              gID("statuslogin").innerHTML =
                '<span class="errormsg">Network error</span>';
          },
          complete: function () {
            setTimeout(function () {
              $(".loginbtn").attr("onClick", "login()"),
                $(".loginbtn").css("cursor", "pointer");
            }, 2e3),
              $(".loginbtn").html("Login"),
              $("#password").val("");
          },
          timeout: 15e3
        });
    }
  }
  function logout(e = !1) {
    $("#logoutmsg").html('<span class="successmsg">Logging out...</span>'),
      $.ajax({
        url: usrap,
        type: "POST",
        data: { logout: "y" },
        success: function (t) {
          isStorage("localStorage") &&
            localStorage.setItem("usrCache", "logout"),
            $("#logoutmsg").html(
              '<span class="successmsg">Logout successful, goodbye...</span>'
            ),
            setTimeout(function () {
              e
                ? (window.location.href = "/")
                : $("#userpanel").fadeOut("normal", function () {
                    onLoggedout(), $("#logoutmsg").html("");
                  });
            }, 1e3);
        },
        error: function (e) {
          $("#logoutmsg").html('<span class="errormsg">Fail logout</span>');
        },
        timeout: 1e4
      });
  }
  function register() {
    var e = grecaptcha.getResponse();
    $("#usernameregis").val().length < 1 ||
    $("#passwordregis").val().length < 2 ||
    $("#confirm").val().length < 2
      ? shownotif("Please fill the required text")
      : $("#passwordregis").val() !== $("#confirm").val()
      ? (shownotif("Confirm password doesn't match!"),
        (gID("confirm").style.borderColor = "red"),
        setTimeout(function () {
          gID("confirm").style.borderColor = "";
        }, 2e3))
      : e.length < 10
      ? shownotif("Please check the captcha")
      : ($(".registerbtn").attr("onClick", ""),
        $(".registerbtn").css("cursor", "default"),
        $(".registerbtn").html("Registering..."),
        $.ajax({
          url: usrap,
          type: "POST",
          data: {
            captcha: e,
            username: $("#usernameregis").val(),
            password: window.btoa($("#passwordregis").val()),
            confirm: window.btoa($("#confirm").val())
          },
          success: function (e) {
            $("#statusregister").html(
              '<span class="successmsg">Success register with username ' +
                e.username +
                "</span>"
            ),
              $(".registerbtn").attr("onClick", "backlogin()"),
              $(".registerbtn").css("cursor", "pointer"),
              $(".registerbtn").html("Login"),
              (gID("formregister").style.display = "none"),
              (gID("gsignsection").style.display = "none");
          },
          error: function (e) {
            grecaptcha.reset();
            var t = "Network error";
            isJson(e.responseText) && (t = JSON.parse(e.responseText).error);
            t.includes("sername") &&
              ((gID("usernameregis").style.borderColor = "red"),
              setTimeout(function () {
                gID("usernameregis").style.borderColor = "";
              }, 2e3)),
              $("#statusregister").html(
                '<span class="errormsg">' + t + "</span>"
              ),
              $(".registerbtn").attr("onClick", "register()"),
              $(".registerbtn").css("cursor", "pointer"),
              $(".registerbtn").html("Register");
          },
          complete: function () {
            $("#passwordregis").val(""), $("#confirm").val("");
          },
          timeout: 15e3
        }));
  }
  var recapthcaNotLoaded = !0;
  function openregister() {
    if (recapthcaNotLoaded) {
      var e = document.createElement("script");
      (e.src =
        "https://www.google.com/recaptcha/api.js"),
        document.body.appendChild(e),
        (recapthcaNotLoaded = !1);
    }
    $("#loginform").fadeOut("normal", function () {
      $("#registerform").fadeIn("slow");
    });
  }
  function backlogin() {
    $("#registerform").fadeOut("normal", function () {
      $("#loginform").fadeIn("slow");
    });
  }
  var curTimeEnabled = !1;
  function shwoschedule() {
    (gID("schedulenotice").style.display = "none"),
      (gID("recomendedlist").innerHTML =
        '<div style="text-align:center;padding-top:50px;color:gray">Loading...</div>'),
      curTimeEnabled || ((curTimeEnabled = !0), currentTime()),
      $.ajax({
        url: "/assets/s/schedule.json",
        type: "GET",
        success: function (e) {
          (scheduleloaded = !0),
            e.forEach(function (e, t, o) {
              var n = dateSchedule(Number(e.time) + 7200);
              (o[t].timeday = n.time), (o[t].daynum = n.daynum);
            }),
            e.sort(function (e, t) {
              return e.timeday < t.timeday ? -1 : e.timeday > t.timeday ? 1 : 0;
            });
          var t = "",
            o = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            n = e.length,
            a = !0,
            s = [23, 60],
            r = new Date(),
            l = r.getDay(),
            i =
              ("0" + r.getHours()).slice(-2) +
              ":" +
              ("0" + r.getMinutes()).slice(-2),
            c = (-1 * r.getTimezoneOffset()) / 60;
          (gID("scheduletimezone").innerHTML = c >= 0 ? "UTC+" + c : "UTC" + c),
            (o[l] += ' <span style="color:#ffed8b">(Today)</span>');
          var d,
            u =
              '<div style="color:#aa9f68;text-align:right;margin-left:10px;margin-top:1px;">- Now -</div>';
          isStorage("localStorage") &&
            "string" !=
              typeof (markedSchedule = localStorage.getItem(
                "markedSchedule"
              )) &&
            (markedSchedule = "");
          for (var m = 0; m < 7; m++) {
            t += `<div class="scheduletitle">${o[l]}</div>`;
            for (var g = 0; g < n; g++)
              e[g].daynum === l &&
                (a &&
                  e[g].timeday > i &&
                  ((t += u), (a = !1), (s = e[g].timeday.split(":"))),
                (d = e[g].malid),
                (t += "<div"),
                markedSchedule.includes(d + ",") &&
                  (t +=
                    ' style="background-color:#1d2f1d;padding:0 5px;border-left:2px solid lime;"'),
                (t += ` id="schedule${d}" class="schedulelist" onClick="markSchedule(${d})"><a href="/anime/${d}">${e[g].name}</a></div><div class="airtime" onClick="markSchedule(${d})">${e[g].timeday}</div>`));
            a && (t += u), (a = !1), 7 === ++l && (l = 0);
          }
          var p = 3600 * (s[0] - r.getHours());
          (p += 60 * (s[1] - r.getMinutes())),
            setTimeout(function () {
              shwoschedule();
            }, 1e3 * p),
            console.log("schedule next refresh in " + p + "s"),
            (gID("recomendedlist").innerHTML = t),
            (gID("recomendedlist").style.marginRight = "15px"),
            (gID("schedulenotice").style.display = "block");
        },
        error: function () {
          gID("recomendedlist").innerHTML =
            '<div style="text-align:center;margin-top:25px;">Network error.<br>Check your internet connection.</div>';
        },
        timeout: 15e3
      });
  }
  var markedSchedule = "";
  function markSchedule(e) {
    if ("A" !== document.activeElement.tagName) {
      var t = gID("schedule" + e),
        o = e + ",";
      markedSchedule.includes(o)
        ? ((t.style = ""), (markedSchedule = markedSchedule.replace(o, "")))
        : ((t.style =
            "background-color:#1d2f1d;padding:0 5px;border-left:2px solid lime;"),
          (markedSchedule += o)),
        isStorage("localStorage") &&
          localStorage.setItem("markedSchedule", markedSchedule);
    }
  }
  var scheduleopen = !1,
    scheduleloaded = !1;
  function showschedulemenu(e = "toggle") {
    var t = (scheduleopen && "toggle" === e) || "close" === e;
    if (scheduleopen !== !t) {
      isMobile()
        ? t
          ? $("#playerleftsidebar").css(
              "animation-name",
              "moveout2mobilerecomend"
            )
          : $("#playerleftsidebar").css(
              "animation-name",
              "movein2mobilerecomend"
            )
        : t
        ? $("#playerleftsidebar").css("animation-name", "moveout2recomend")
        : $("#playerleftsidebar").css("animation-name", "movein2recomend");
      var o = gID("coverlight");
      t
        ? (o.removeEventListener("click", closeSchedule),
          $(o).fadeOut(400),
          mobilemenuopen || (autoReload = !0))
        : ((o.style.zIndex = "21"),
          $(o).fadeIn(300),
          scheduleloaded || shwoschedule(),
          o.addEventListener("click", closeSchedule),
          (autoReload = !1)),
        (scheduleopen = !t);
    }
  }
  function currentTime() {
    var e = new Date(),
      t = e.getHours(),
      o = e.getMinutes(),
      n = e.getSeconds();
    (t = updateTime(t)),
      (o = updateTime(o)),
      (n = updateTime(n)),
      (gID("seasontitle").innerHTML = t + ":" + o + ":" + n),
      setTimeout(function () {
        currentTime();
      }, 1e3);
  }
  function updateTime(e) {
    return e < 10 ? "0" + e : e;
  }
  function closeSchedule() {
    showschedulemenu("close");
  }
  var mobilemenuopen = !1;
  function showmobilemenu() {
    mobilemenuopen
      ? ($(".rightside").css("animation-name", "moveout2mobile"),
        (autoReload = !0))
      : ($(".rightside").css("animation-name", "movein2mobile"),
        (autoReload = !1)),
      (mobilemenuopen = !mobilemenuopen);
  }
  var xDown = null,
    yDown = null,
    swipeThresold = 60;
  function getTouches(e) {
    return e.touches || e.originalEvent.touches;
  }
  function handleTouchStart(e) {
    const t = getTouches(e)[0];
    (xDown = t.clientX), (yDown = t.clientY);
  }
  function handleTouchMove(e) {
    if (xDown && yDown) {
      var t = xDown - e.touches[0].clientX,
        o = yDown - e.touches[0].clientY;
      (Math.abs(t) < swipeThresold && Math.abs(o) < swipeThresold) ||
        (Math.abs(t) > Math.abs(o) &&
          (t > 0
            ? scheduleopen
              ? showschedulemenu("close")
              : isMobile() &&
                ($(".rightside").css("animation-name", "movein2mobile"),
                (mobilemenuopen = !0))
            : mobilemenuopen
            ? ($(".rightside").css("animation-name", "moveout2mobile"),
              (mobilemenuopen = !1))
            : showschedulemenu("open")),
        (xDown = null),
        (yDown = null));
    }
  }
  var searchmobileopen = !1;
  function togglesearch() {
    var e = gID("q");
    searchmobileopen
      ? ((gID("showsearchbtn").innerHTML =
          '<i class="glyphicon glyphicon-search"></i>'),
        (gClass("webtitle")[0].style.display = ""),
        (e.style.display = ""),
        (e.style.maxWidth = ""),
        (e.value = ""),
        (gClass("quickresult")[0].innerHTML = ""),
        (gID("searchbox").style.marginLeft = ""))
      : ((gID("showsearchbtn").innerHTML =
          '<i class="glyphicon glyphicon-remove"></i>'),
        (gClass("webtitle")[0].style.display = "none"),
        (e.style.display = "inline"),
        (e.style.maxWidth = "100%"),
        (gID("searchbox").style.marginLeft = "30px"),
        e.focus()),
      (searchmobileopen = !searchmobileopen);
  }
  var weekly10 = "",
    weekly20 = "";
  function weeklyrender(e = 10) {
    var t = gID("ongoingplace");
    if (10 === e)
      if ("" === weekly10) {
        ((n = document.createElement("script")).src =
          "/assets/weeklytop.min.js"),
          document.body.appendChild(n);
        var o = setInterval(function () {
          "" !== (weekly10 = t.innerHTML) && clearInterval(o);
        }, 1e3);
      } else t.innerHTML = weekly10;
    else if ("" === weekly20) {
      var n;
      (t.innerHTML += '<div style="text-align: center;">Loading...</div>'),
        ((n = document.createElement("script")).src =
          "/assets/weeklytop2.min.js"),
        document.body.appendChild(n);
      o = setInterval(function () {
        "" !== (weekly20 = t.innerHTML) && clearInterval(o);
      }, 1e3);
    } else t.innerHTML = weekly20;
  }
  function expandweekly() {
    weeklyrender(20);
    var e = gID("expandbtn2");
    e.setAttribute("onClick", "reduceweekly()"),
      e.children[0].classList.remove("glyphicon-menu-down"),
      e.children[0].classList.add("glyphicon-menu-up");
  }
  function reduceweekly() {
    weeklyrender(10);
    var e = gID("expandbtn2");
    e.setAttribute("onClick", "expandweekly()"),
      e.children[0].classList.remove("glyphicon-menu-up"),
      e.children[0].classList.add("glyphicon-menu-down");
  }
  function readmore() {
    var e = gID("announcement").scrollHeight;
    return (
      (gID("announcement").style.height = e.toString() + "px"),
      gID("readmorebtn").setAttribute("onClick", "readless()"),
      document
        .querySelector("#readmorebtn i")
        .classList.remove("glyphicon-menu-down"),
      document
        .querySelector("#readmorebtn i")
        .classList.add("glyphicon-menu-up"),
      !1
    );
  }
  function readless() {
    return (
      (gID("announcement").style.height = "48px"),
      gID("readmorebtn").setAttribute("onClick", "readmore()"),
      document
        .querySelector("#readmorebtn i")
        .classList.remove("glyphicon-menu-up"),
      document
        .querySelector("#readmorebtn i")
        .classList.add("glyphicon-menu-down"),
      !1
    );
  }
  var genreExpanded = !1;
  function expandgenre() {
    genreExpanded = !0;
    var e = gID("genreplace").scrollHeight;
    return (
      (gID("genreplace").style.height = e.toString() + "px"),
      gID("expandbtn").setAttribute("onClick", "reducegenre()"),
      document
        .querySelector("#expandbtn i")
        .classList.remove("glyphicon-menu-down"),
      document.querySelector("#expandbtn i").classList.add("glyphicon-menu-up"),
      !1
    );
  }
  function reducegenre() {
    return (
      (genreExpanded = !1),
      (gID("genreplace").style.height = "183px"),
      gID("expandbtn").setAttribute("onClick", "expandgenre()"),
      document
        .querySelector("#expandbtn i")
        .classList.remove("glyphicon-menu-up"),
      document
        .querySelector("#expandbtn i")
        .classList.add("glyphicon-menu-down"),
      !1
    );
  }
  function infoclose() {
    $("#tips").css("display", "none"), $("#notifiaction").css("top", "120px");
  }
  var scheduleJSON,
    notifDisplayed = !1;
  function shownotif(e, t = 1700) {
    var o = setInterval(function () {
      if (!notifDisplayed) {
        notifDisplayed = !0;
        var n = gID("notifiaction");
        (n.innerHTML = e),
          (n.style.display = "block"),
          (n.style.animationName = "notifin"),
          setTimeout(function () {
            n.style.animationName = "notifout";
          }, t + 400),
          setTimeout(function () {
            (n.style.display = "none"), (notifDisplayed = !1);
          }, t + 800),
          clearInterval(o);
      }
    }, 50);
  }
  function focusLogin() {
    gID("username").focus(), scrollToTop(300), isMobile() && showmobilemenu();
  }
  function buildlist(e) {
    var t = "";
    return (
      Object.keys(e).forEach(function (o) {
        if (
          ((t += "<li"),
          void 0 !== e[o].mainsource &&
            e[o].mainsource &&
            (t += ' class="mainsource"'),
          (t += `><a href="${e[o].url}" title="${e[o].title}">\n<div class="searchimg">\n    <img class="resultimg" src="${e[o].picture}"/>`),
          void 0 !== e[o].timetop &&
            (t += `<div class="timetext">${daterelative2(e[o].timetop)}</div>`),
          void 0 !== e[o].score)
        ) {
          var n = Number(e[o].score);
          (n = 0 === (n = (1 * n) / 100) ? "?" : n.toFixed(2)),
            (t += `<div class="rating"><i class="glyphicon glyphicon-star"></i> ${n}</div>`);
        }
        t += `</div><div class="details">\n    <p class="name">${movedubtofront2(
          e[o].title
        )}</p>\n    <p class="infotext">${e[o].infotext}</p>\n</div></a></li>`;
      }),
      t
    );
  }
  function normalizeScore() {
    var e = Number(this.innerHTML);
    (e = 0 === (e = (1 * e) / 100) ? "?" : e.toFixed(2)),
      (this.innerHTML = '<i class="glyphicon glyphicon-star"></i> ' + e);
  }
  function movedubtofront2(e) {
    return (
      "(dub)" === (e = e.trim()).substr(e.length - 5).toLowerCase() &&
        (e =
          "<span class='dubtag'>[Dub]</span> " + e.substring(0, e.length - 5)),
      e
    );
  }
  function daterelative2(e, t = !1) {
    var o = e;
    isNaN(e) && (e = e.replace(" ", "T") + "+00:00");
    var n = new Date(e);
    if (!isNaN(n) && null !== e) {
      if (t || "undefined" == typeof nowtime || nowtime.length < 1)
        var a = new Date();
      else a = new Date(nowtime.replace(" ", "T") + "+00:00");
      var s = Math.round((a - n) / 1e3),
        r = 3600,
        l = 86400,
        i = 30 * l,
        c = 31104e3;
      o =
        s < 2
          ? "Just now"
          : s < 60
          ? s + " seconds ago"
          : s < 120
          ? "a minute ago"
          : s < r
          ? Math.floor(s / 60) + " minutes ago"
          : 1 == Math.floor(s / r)
          ? "1 hour ago"
          : s < l
          ? Math.floor(s / r) + " hours ago"
          : s < 2 * l
          ? "yesterday"
          : s < i
          ? Math.floor(s / l) + " days ago"
          : s < 5184e3
          ? "1 month ago"
          : s < c
          ? Math.floor(s / i) + " months ago"
          : Math.floor(s / c) + " years ago";
    }
    return o;
  }
  function formatCountdown() {
    if (!this.innerHTML.includes("m"))
      if (this.parentNode.parentNode.innerHTML.includes("(Dub)"))
        this.innerHTML = "Unknown";
      else if (null != scheduleJSON) {
        var e = this.innerHTML,
          t = "none";
        scheduleJSON.forEach(function (o, n, a) {
          o.malid == e && (t = o.time);
        }),
          (this.innerHTML = "none" !== t ? countdownBuild(t) : "Unknown");
      } else this.innerHTML = "Failed to load schedule";
  }
  function countdownBuild(e) {
    for (var t = new Date(), o = 1e3 * (Number(e) + 7200) - t; o < -108e5; )
      o += 6048e5;
    if (o < 0) return "scheduled now";
    var n = Math.floor(o / 864e5),
      a = Math.floor((o % 864e5) / 36e5),
      s = "";
    return (
      n > 0 && (s += n + "d "),
      a > 0 && (s += a + "h "),
      (s += Math.floor((o % 36e5) / 6e4) + "m")
    );
  }
  function dateSchedule(e) {
    var t = new Date(1e3 * e),
      o = {};
    return (
      (o.daynum = t.getDay()),
      (o.time =
        ("0" + t.getHours()).slice(-2) +
        ":" +
        ("0" + t.getMinutes()).slice(-2)),
      o
    );
  }
  function movedubtofront() {
    this.innerHTML.includes("ub)") &&
      (this.innerHTML = movedubtofront2(this.innerHTML));
  }
  function daterelative() {
    this.innerHTML = daterelative2(this.innerHTML);
  }
  var deferredPrompt,
    notFoundID = {},
    gID = function (e) {
      var t = document.getElementById(e);
      return (
        null === t &&
          (void 0 === notFoundID[e]
            ? ((t = document.createElement("div")), (notFoundID[e] = t))
            : (t = notFoundID[e])),
        t
      );
    },
    notFoundClass = {},
    gClass = function (e) {
      var t = document.getElementsByClassName(e);
      return (
        void 0 === t[0] &&
          (void 0 === notFoundClass[e]
            ? ((t = [document.createElement("div")]), (notFoundClass[e] = t))
            : (t = notFoundClass[e])),
        t
      );
    };
  function opendiscord() {}
  function isMobile() {
    return window.innerWidth < 1130;
  }
  function scrollToTop(e) {
    iOS() ||
      ("scrollBehavior" in document.documentElement.style
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : window.scrollTo(0, 0));
  }
  function getapURL(e) {
    var t = Math.floor(9 * Math.random()),
      o = [
        "ic5qwh28vwloyjo28qtg",
        "w0ltfgqz8y3ygjozgs4v",
        "nmtvjxdtx42qdwktdxjfoikjq",
        "2snpxh6dqulm1c0ppnivgzdt",
        "gykngaxzenja64nweh3a2kz2",
        "bgmvcle5cq9kjycjokrtwii9e",
        "ij7p9towl8uj4qafsopjtrjk",
        "6kdst8yelac6xagbyeuspg7ua"
      ];
    return t < o.length
      ? "https://v" + e + "." + o[t] + ".workers.dev"
      : "/api/search/v" + e;
  }
  function askconfirm(e) {
    var t = performance.now(),
      o = confirm(e);
    return performance.now() - t < 200 || o;
  }
  window.addEventListener("beforeunload", function () {
    gID("loadcontainer").style.display = "block";
  }),
    document.addEventListener("DOMContentLoaded", function () {
      if (window.innerWidth < 1e3) {
        var e = !1;
        window.addEventListener("beforeinstallprompt", (t) => {
          t.preventDefault(),
            (deferredPrompt = t),
            e || (gID("pwaContainer").style.display = "block");
        }),
          gID("pwaButton").addEventListener("click", (t) => {
            (gID("pwaContainer").style.display = "none"),
              deferredPrompt.prompt(),
              deferredPrompt.userChoice.then((t) => {
                "accepted" === t.outcome &&
                  ((e = !0),
                  setTimeout(function () {
                    shownotif("PWA added to homescreen", 1e4);
                  }, 2e3));
              });
          }),
          iOS() &&
            !isInStandaloneMode() &&
            ((gID("pwaContainer").innerHTML =
              "Add this website to homescreen to use PWA"),
            (gID("pwaContainer").style.display = "block"));
      }
      "com" === getrequest("from") &&
        isInStandaloneMode() &&
        shownotif(
          "<br>We move domain to animixplay.to !<br><br>please re-install your PWA app from new domain<br><br>",
          25e3
        );
    }),
    "serviceWorker" in navigator &&
      !window.location.pathname.includes("user") &&
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js");
      });
  var confirmLoaded = !1;
  function callconfirm(e, t, o = !1) {
    if (confirmLoaded) gID("confirmtext").innerHTML = e;
    else {
      var n = document.createElement("div");
      (n.innerHTML =
        '<div id="confirmtext" style="margin:10px 5px;">' +
        e +
        '</div><button class="changepassbtn" id="dialogno">Cancel</button> <button class="changepassbtn" id="dialogyes">Confirm</button>'),
        n.setAttribute("id", "confdialog"),
        document.body.appendChild(n),
        (confirmLoaded = !0);
    }
    var a = gID("confdialog"),
      s = gID("coverlight"),
      r = s.style.zIndex;
    (gID("dialogyes").onclick = function () {
      (a.style.display = "none"),
        (s.style.zIndex = r),
        (s.style.display = "none"),
        (s.style.backgroundColor = ""),
        "function" == typeof t && t();
    }),
      (gID("dialogno").onclick = function () {
        (a.style.display = "none"),
          (s.style.zIndex = r),
          (s.style.display = "none"),
          (s.style.backgroundColor = ""),
          "function" == typeof o && o();
      }),
      (s.style.zIndex = "99"),
      (s.style.backgroundColor = "rgba(15,15,15,.6)"),
      (a.style.display = "block"),
      (s.style.display = "block");
  }
  function getrequest(e) {
    var t = null,
      o = [];
    return (
      location.search
        .substr(1)
        .split("&")
        .forEach(function (n) {
          (o = n.split("="))[0] === e && (t = decodeURIComponent(o[1]));
        }),
      t
    );
  }
  function escapeHtml(e) {
    var t = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return e.replace(/[&<>"']/g, function (e) {
      return t[e];
    });
  }
  function isStorage(e) {
    try {
      var t = window[e],
        o = "__storage_test__";
      return t.setItem(o, o), t.removeItem(o), !0;
    } catch (e) {
      return !1;
    }
  }
  function iOS() {
    return (
      ["iPad", "iPhone", "iPod"].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }
  function isInStandaloneMode() {
    return !(
      !navigator.standalone &&
      !window.matchMedia("(display-mode: standalone)").matches
    );
  }
  function isJson(e) {
    try {
      JSON.parse(e);
    } catch (e) {
      return !1;
    }
    return !0;
  }
}
