var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

const additionaltitle = " - AniMixPlay";
var uid,
  epData,
  animeTitle = "",
  epsavailable = 0,
  isHaveExtra = !1;
function customOnload() {
  if ((uid = window.location.pathname.split("/")[2])) {
    if (
      ((mode = "proxy"),
      "Status : Completed." === gID("status").innerHTML &&
        ((mode = "proxy"), (gID("status").innerHTML = "Status : Completed")),
      "proxy" == mode &&
        ($(".proxybtn").css("color", "white"),
        $(".altsourcenotif").html("Internal Player")),
      isStorage("localStorage") &&
        "no" === localStorage.getItem("autoplay") &&
        toggleautoplay(!1),
      -1 !== gClass("animetitle")[0].innerHTML.indexOf("Generating"))
    ) {
      var e = gID("animeimage");
      (e.innerHTML =
        '<svg class="spinner" width="75px" height="75px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">\n            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>\n        </svg>'),
        (e.style.display = "block"),
        $.ajax({
          url: src,
          type: "POST",
          data: { id: uid },
          success: function (e) {
            (animeTitle = e.name),
              $(".animetitle").html(animeTitle),
              (gID("trackingTitle").innerHTML = animeTitle),
              (document.title = animeTitle + " - AniMixPlay"),
              $("#status").html("Status : " + e.status),
              buildEpslist(e.epstream, e.genres);
          },
          error: function (e, t) {
            if ("timeout" == t)
              $(".animetitle").html(
                "Timeout, try another source<br>or try again later"
              );
            else if (isJson(e.responseText)) {
              var a = JSON.parse(e.responseText);
              $(".animetitle").html(a.error);
            } else $(".animetitle").html("Unexplained error, try again later");
            $("#notice").html("");
          },
          complete: function () {
            e.style.display = "none";
          },
          timeout: 18e4
        });
    } else {
      (animeTitle = gClass("animetitle")[0].innerText),
        (gID("trackingTitle").innerHTML = animeTitle);
      var t = gID("genredata").innerHTML;
      buildEpslist(JSON.parse(gID("epslistplace").innerHTML), t);
    }
    document.addEventListener("keyup", keyupListener, !1),
      window.addEventListener("message", handleMsg, !1);
  } else $(".animetitle").html("Invalid ID");
}
function buildEpslist(e, t) {
  var a = "",
    n = 1;
  (epData = e),
    e.hasOwnProperty("ep0") &&
      ((a +=
        "<button class='playbutton btn btn-primary' onClick='openiframe(this, 0)'>0</button>"),
      (n += 1),
      (isHaveExtra = !0));
  var o,
    i = {};
  if (e.hasOwnProperty("extra")) {
    var l;
    for (var s in e.extra)
      isNaN(s)
        ? void 0 !== i[(l = 0)]
          ? (i[l] += "#!#" + s)
          : (i[l] = s)
        : (i[(l = Math.floor(s))] = s);
    n += 1;
  }
  if (void 0 !== i[0])
    if (-1 !== i[0].indexOf("#!#")) {
      var r,
        c = i[0].split("#!#");
      for (r = 0; r < c.length; r++)
        a += `<button class='playbuttonextra btn btn-primary' onClick='openiframe(this,"${c[r]}")'>${c[r]}</button>`;
    } else
      a += `<button class='playbuttonextra btn btn-primary' onClick='openiframe(this,"${i[0]}")'>${i[0]}</button>`;
  for (epsavailable = Object.keys(e).length - n, o = 1; o <= epsavailable; o++)
    void 0 !== e[o - 1] && "-" != e[o - 1]
      ? (a += `<button class='playbutton btn btn-primary' onClick='openiframe(this,${o.toString()})'>${o.toString()}</button>`)
      : (a += `<button class='playbutton btn btn-primary hidden'>${o.toString()}</button>`),
      void 0 !== i[o] &&
        (a += `<button class='playbuttonextra btn btn-primary' onClick='openiframe(this,"${i[o]}")'>${i[o]}</button>`);
  if (
    (epsavailable < e.eptotal &&
      (a +=
        "<button id='loadmorebtn' class='btn btn-success' onClick='loadmore()'>Load more episodes</button>"),
    0 == e.eptotal &&
      1 === n &&
      (a =
        "<button class='loadmorebtn btn btn-primary' disabled>No episodes available</button>"),
    (gID("epslistplace").innerHTML = a),
    (gID("epsavailable").innerHTML = e.eptotal),
    null != t)
  ) {
    var p = t.split(", ");
    p.forEach(formatgenres);
    var d = p.join(", ");
    $("#genres").html("Genres : " + d);
  }
  loaded();
}
const baseURL = "/",
  src = "/e1/9DYiGVLD7ASqZ5p",
  ap = "/a/XsWgdGCnKJfNvDFAM28EV",
  ap2 = "/a/3KjJkx2RVQu1zeXQnrZWc",
  usrap = "/api/usr";
if ("string" == typeof copt && -1 !== copt.indexOf("#gh="))
  var gohostname = copt.split("#gh=")[1].split("#")[0];
else gohostname = "gogoplay.io";
var isChrome = !0,
  watchstatus = "Watching";
function openRequested() {
  var e = !0;
  if ("string" == typeof window.location.pathname.split("/")[3]) {
    var t,
      a = window.location.pathname.split("/")[3].substr(2);
    if (-1 !== a.indexOf(".") || isNaN(a))
      for (var n = gClass("playbuttonextra"), o = 0; o < n.length; o++)
        n[o].innerText === a && (t = n[o]);
    else if (!isNaN(a)) {
      var i = Number(a);
      isHaveExtra && (i += 1), (t = gClass("playbutton")[i - 1]);
    }
    void 0 !== t && (t.click(), (e = !1));
  }
  if (e) {
    var l = gClass("playbutton")[0];
    "function" == typeof l.onclick
      ? l.click()
      : gClass("playbuttonextra")[0].click();
  }
}
function loaded() {
  var e = -1 !== document.title.indexOf(" (R)");
  (-1 !== document.title.indexOf("(Uncensored)") || e) &&
    "function" == typeof callconfirm &&
    (callconfirm(
      "You must be 18 years of age or older to watch this anime",
      !1,
      function () {
        location.href = "/";
      }
    ),
    (isAdult = !0)),
    e &&
      ((isAdult = !1),
      (animeTitle = animeTitle.replace(" (R)", "")),
      (document.title = animeTitle + " - AniMixPlay"),
      $(".animetitle").html(animeTitle),
      (gID("trackingTitle").innerHTML = animeTitle));
  var t = gID("sharebtn");
  ("ontouchstart" in window ||
    (navigator.maxTouchPoints > 0 && navigator.maxTouchPoints < 200)) &&
    ((t.style.display = "block"),
    t.addEventListener("click", function () {
      navigator.share
        ? navigator.share({ title: animeTitle, url: window.location.href })
        : (copyToClipboard(window.location.href),
          shownotif("URL copied to clipboard"));
    })),
    $("#openreport").css("display", "block");
  var a = gID("reloadbtn");
  if (null !== a) {
    var n = !1;
    (a.style.display = "block"),
      a.addEventListener("click", function () {
        if (n) shownotif("Don't spam click");
        else {
          (n = !0),
            setTimeout(function () {
              n = !1;
            }, 3e3);
          var e = gID("iframeplayer").src;
          if (e.includes("embed.html") && !sandboxEnabled) e = oldlink;
          else {
            if (e.includes("goplyr.html"))
              return (mode = "normal"), void switchToLive(!1);
            autoplay &&
              ((autoplaying = !1), (autoplaycount = 0), askAutoPlay());
          }
          gID("iframeplayer").src = e;
        }
      });
  }
  if (!isTouch() || window.innerWidth > 1e3) {
    var o = document.createElement("div");
    (o.innerHTML = '<i class="glyphicon glyphicon-camera"></i>'),
      (o.id = "screenshotbtn"),
      o.addEventListener("click", function () {
        "proxy" === mode
          ? gID("iframeplayer").contentWindow.postMessage("screenshot", "*")
          : shownotif("Cannot screenshot external player");
      }),
      gID("streamtypecontainer").appendChild(o);
  }
  if (window.innerWidth > 1e3) {
    var i = document.createElement("div");
    (i.innerHTML = '<i class="glyphicon glyphicon-fullscreen"></i>'),
      (i.id = "widescreenbtn"),
      i.addEventListener("click", function () {
        !1 === gID("iframeplayer").src.includes(location.hostname) &&
          fullscreenFallback(!inFallbackFull),
          gID("iframeplayer").contentWindow.postMessage("usewidescreen", "*");
      }),
      gID("streamtypecontainer").appendChild(i);
  }
  "proxy" !== mode && enableSandboxBtn(),
    isChrome
      ? "proxy" !== mode
        ? ((gID("tips").innerHTML =
            'If you get Embed blocked error, change Chrome PDF setting <a href="/assets/s/pdf.png" target="_blank">like this</a>.<br>This will fix the error. <i onClick="infoclose();" class="closebtn glyphicon glyphicon-remove-sign"></i>'),
          (gID("tips").style.display = "block"),
          (gID("notifiaction").style.top = "170px"),
          (gID("iframeplayer").src =
            "https://" + window.location.hostname + "/embed.html"))
        : openRequested()
      : ((gID("tips").style.display = "none"), openRequested()),
    gID("iframeplayer").addEventListener("load", function (e) {
      gID("loadcontainer2").style.display = "none";
    }),
    "function" == typeof onEpBuild && onEpBuild(),
    (gID("notice").style.display = "none"),
    (gID("flexbottom").style.display = "flex"),
    (isCompleted() && 0 !== epsavailable) || handleAiring(),
    $.ajax({
      url: ap2,
      type: "POST",
      data: { t: utoken },
      success: function (e) {
        var t = e.episode;
        if (null != t) {
          if (1 != t && 0 != t) {
            var a = gClass("playbutton"),
              n = t;
            isHaveExtra && (n += 1);
            var o = a[n - 1];
            if (a.length >= n)
              for (var i = 0; i < n; i++) a[i].style.opacity = "0.4";
            void 0 !== o &&
              1 === activeEpsNumber &&
              "Finished" !== e.status &&
              (shownotif("Resuming episode " + t),
              (liveplayLimit = !1),
              o.click());
          } else
            "yes" == e.new
              ? (shownotif("Anime added to your history", 2e3),
                0 === t && 1 === activeEpsNumber && updatetele(1, !0))
              : !e.hasOwnProperty("untracked") &&
                activeEpsNumber > 1 &&
                (gClass("playbutton")[0].style.opacity = "0.4");
          var l;
          (autotrack = e.autotracking),
            (useSIMKLsync = e.useSIMKLsync),
            (maxepisode = t),
            (untracked = e.hasOwnProperty("untracked")),
            t === activeEpsNumber - 1 &&
              !untracked &&
              autotrack &&
              updatetele(activeEpsNumber, !0),
            "Finished" === e.status
              ? ((watchstatus = "Finished"), (l = 3))
              : "Planned" !== e.status || autotrack
              ? "PTW" !== e.status || autotrack
                ? "Watching" === e.status
                  ? (l = 0)
                  : ($("#untrackbtn").css("display", "none"), (l = -1))
                : ((watchstatus = "Planned"), (l = 2))
              : ((watchstatus = "On-hold"), (l = 1));
          var s = gID("manualTrackingSelect");
          (s.selectedIndex = l),
            (s.style.display = "block"),
            s.addEventListener("change", manualTrackingStatus),
            e.follow && (following = !0),
            autotrack || "Watching" !== e.status
              ? autotrack && "Planned" === e.status
                ? setTimeout(function () {
                    shownotif("Anime moved out from On-hold", 2200);
                  }, 2900)
                : autotrack &&
                  "PTW" === e.status &&
                  setTimeout(function () {
                    shownotif("Anime moved out from Planned", 2200);
                  }, 2900)
              : setTimeout(function () {
                  shownotif("You turned OFF Autotracking");
                }, 2900),
            untracked
              ? ((gID("tracknumber").innerHTML = 0),
                (watchstatus = "Untracked"))
              : (gID("tracknumber").innerHTML = maxepisode),
            onUserLoaded(),
            untracked &&
              ((gID("trackbtn").style.display = "inline"),
              (gID("manualtrackbtn").innerHTML = "Start tracking")),
            $("#refreshicon").attr("href", "/user/" + e.username),
            $("#usernametop").html(e.username),
            showuserpanel(e.username),
            (gID("manualTrackingCard").style.display = "block"),
            window.innerWidth > 1770 && showmobilemenu();
          var r = {};
          if (
            ((r.username = e.username),
            (r.autotracking = e.autotracking),
            e.hasOwnProperty("lighton"))
          ) {
            (r.premium = 1),
              (r.expire = e.expire),
              (autolightoff = e.lighton),
              autolightoff && window.setInterval(checkFocus, 1e3),
              (autoproxy = e.proxy),
              autoproxy && "normal" === mode ? switchToLive(!1) : autoproxy,
              (prefersub = e.prefersub),
              (accountautoplay = e.autoplay),
              accountautoplay || toggleautoplay(!1),
              (playback = e.playback),
              isStorage("localStorage") &&
                (playback
                  ? localStorage.setItem("premiumkey", "7Exm5Bg0vEHyv2VEXyT9")
                  : localStorage.setItem("premiumkey", "FExm5Bg0vEHyv2VEXyTF")),
              (isPremium = !0),
              (gID("playerbottomicon").innerHTML = "Thank you for donating!");
            var c = " 👑";
            if (null != e.expire) {
              var p = new Date().getTime(),
                d = new Date(e.expire.replace(/-/g, "/")),
                u = Math.round((d - p) / 1e3);
              c += ` <span id="timeleft">(${(u = Math.ceil(
                u / 86400
              ))} days)</span>`;
            }
            $("#premiumcrown").html(c),
              (gID("premiumnotice").style.display = "none"),
              autolightoff
                ? (gID("autolightsbtn").style.color = "#7fc3ff")
                : (gID("autolightsbtn").style.color = "gray"),
              autoproxy
                ? (gID("autoproxybtn").style.color = "#7fc3ff")
                : (gID("autoproxybtn").style.color = "gray"),
              prefersub
                ? (gID("preferbtn").style.color = "#7fc3ff")
                : (gID("preferbtn").style.color = "gray"),
              accountautoplay
                ? (gID("userautoplaybtn").style.color = "#7fc3ff")
                : (gID("userautoplaybtn").style.color = "gray"),
              playback
                ? (gID("autoplaybackbtn").style.color = "#7fc3ff")
                : (gID("autoplaybackbtn").style.color = "gray");
          }
          if (isStorage("localStorage")) {
            var m = JSON.stringify(r);
            localStorage.setItem("usrCache", m);
          }
          (isCompleted() && 0 !== epsavailable) ||
            (gID("updatebtn").style.display = "inline");
        } else
          isStorage("localStorage") &&
            localStorage.setItem("usrCache", "logout"),
            (maxepisode = 1),
            $("#loginform").fadeIn("slow"),
            $("#refreshicon").attr("href", "/user/"),
            loadGsign();
        "function" == typeof onTeleLoaded && onTeleLoaded(e);
      },
      error: function (e) {
        if (isJson(e.responseText)) {
          var t = JSON.parse(e.responseText);
          shownotif(t.error);
        } else shownotif("Can't connect to user api");
      },
      complete: function () {
        isCompleted() || (gID("followbtn").style.display = "inline"),
          (gClass("usercard")[0].style.display = "block"),
          (gClass("loadingreplacement")[0].style.display = "none"),
          (gID("loadcontainer").style.display = "none");
        var e = gID("watchingstatus");
        void 0 !== e && (e.innerHTML = "Status : " + watchstatus);
      }
    });
}
var frameACache = "enabled",
  frameMsgLoaded = !1,
  frameMsgCount = 0;
function displayFrameA() {
  var e = gID("iframeplayer");
  -1 !== e.src.indexOf(location.hostname) &&
    isMobile() &&
    ((frameMsgLoaded = !1),
    e.contentWindow.postMessage("load#" + frameACache, "*"),
    setTimeout(() => {
      frameMsgCount++, !frameMsgLoaded && frameMsgCount < 21 && displayFrameA();
    }, 500));
}
var oldbutton,
  currentbutton,
  maxepisode,
  activeEpsNumber,
  untracked,
  autoplaying = !1,
  autoplaycount = 0,
  firstLoad = !0;
function askAutoPlay() {
  var e = gID("iframeplayer");
  (e.src.includes(location.hostname) || e.src.includes("/player.html")) &&
    (e.contentWindow.postMessage("autoplay", "*"),
    autoplaycount++,
    setTimeout(function () {
      !autoplaying && autoplaycount < 21 && askAutoPlay();
    }, 500));
}
function loadmore() {
  var e = epsavailable;
  (gID("loadmorebtn").disabled = !0),
    (gID("loadmorebtn").innerHTML = "Generating..."),
    $.ajax({
      url: src,
      type: "POST",
      data: { id: uid, loadmore: e },
      success: function (t) {
        epData = t.epstream;
        var a,
          n = gID("epslistplace").innerHTML,
          o = 1;
        for (
          t.epstream.hasOwnProperty("ep0") && (o += 1),
            epsavailable = Object.keys(t.epstream).length - o,
            a = Number(e) + 1;
          a <= epsavailable;
          a++
        )
          "-" !== t.epstream[a - 1] &&
            (n += `<button class='playbutton btn btn-primary' onClick='openiframe(this,${a.toString()})'>${a.toString()}</button>`);
        epsavailable < t.epstream.eptotal &&
          e != epsavailable &&
          (n +=
            "<button id='loadmorebtn' class='btn btn-success' onClick='loadmore()'>Load more episodes</button>"),
          (gID("epslistplace").innerHTML = n),
          (currentbutton = gClass("playbutton")[activeEpsNumber - 1]),
          $("#loadmorebtn").remove();
      },
      error: function (e) {
        if (isJson(e.responseText)) {
          var t = JSON.parse(e.responseText);
          $("#loadmorebtn").html(t.error);
        } else $("#loadmorebtn").html("connection error");
        $("#loadmorebtn").attr("class", "btn btn-danger");
      },
      timeout: 3e5
    });
}
function updatecheck() {
  $("#updatebtn").attr("onclick", null),
    $("#updatebtn").css("cursor", "default"),
    $("#updatebtn").html("<br>Checking..."),
    $.ajax({
      url: src,
      type: "POST",
      data: { update: uid },
      success: function (e) {
        var t,
          a = "",
          n = 1;
        for (
          (epData = e.epstream).hasOwnProperty("ep0") &&
            ((a +=
              "<button class='playbutton btn btn-primary' onClick='openiframe(this, 0)'>0</button>"),
            (n += 1)),
            epsavailable = Object.keys(epData).length - n,
            t = 1;
          t <= epsavailable;
          t++
        )
          "-" != epData[t - 1] &&
            (a += `<button class='playbutton btn btn-primary' onClick='openiframe(this,${t.toString()})'>${t.toString()}</button>`);
        epsavailable < epData.eptotal &&
          (a +=
            "<button id='loadmorebtn' class='btn btn-success' onClick='loadmore()'>Load more episodes</button>"),
          $("#epslistplace").html(a),
          $("#epsavailable").html(epData.eptotal),
          $("#status").html("Status : " + e.status),
          "Ongoing" == e.status || 0 == epsavailable
            ? $("#updatebtn").css("display", "inline")
            : $("#updatebtn").css("display", "none"),
          $("#updatebtn").html("<br>Updated!");
      },
      error: function (e) {
        if (isJson(e.responseText)) {
          var t = JSON.parse(e.responseText);
          $("#updatebtn").html("<br>" + t.error);
        } else $("#updatebtn").html("<br>fail");
      },
      complete: function () {},
      timeout: 12e4
    });
}
var sandboxBtnEnabled = !1,
  sandboxEnabled = !1;
function enableSandboxBtn() {
  if (sandboxBtnEnabled) gID("sandboxbtn").style.display = "block";
  else {
    sandboxBtnEnabled = !0;
    var e = document.createElement("div");
    (e.innerHTML = "Sandbox off"),
      (e.id = "sandboxbtn"),
      (e.style.display = "block"),
      (e.style.color = "gray"),
      e.addEventListener("click", function () {
        var e = gID("sandboxbtn"),
          t = gID("iframecontainer"),
          a = gID("iframeplayer").src,
          n = gClass("altsourcenotif")[0],
          o = "",
          i = "";
        "string" == typeof copt &&
          copt.includes("#allowrefer") &&
          (i = 'referrerpolicy="origin"'),
          sandboxEnabled
            ? ((sandboxEnabled = !1),
              (e.style.color = "gray"),
              (e.innerHTML = "Sandbox off"),
              (t.innerHTML =
                '<iframe id="iframeplayer" ' +
                i +
                ' allowfullscreen="true" scrolling="no" src="' +
                a +
                '" style="display: block;"></iframe>'),
              (n.innerHTML = "External (Ads)"))
            : ((o = a),
              (sandboxEnabled = !0),
              (e.style.color = null),
              (e.innerHTML = "Sandbox on"),
              (t.innerHTML =
                '<iframe id="iframeplayer" ' +
                i +
                ' allowfullscreen="true" sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-orientation-lock" scrolling="no" src="' +
                o +
                '" style="display: block;"></iframe>'),
              (n.innerHTML = "External Player")),
          gID("iframeplayer").addEventListener("load", function (e) {
            gID("loadcontainer2").style.display = "none";
          });
      }),
      gID("streamtypecontainer").appendChild(e);
  }
}
function disableSandboxBtn() {
  sandboxBtnEnabled && (gID("sandboxbtn").style.display = "none");
}
var mode = "normal",
  oldlink = "",
  switchLimiter = !1;
function switchToLive(e = !0) {
  if (!switchLimiter)
    if (
      ((switchLimiter = !0),
      setTimeout(function () {
        switchLimiter = !1;
      }, 2e3),
      !oldlink.includes("streaming.php") &&
        oldlink.includes("?id=") &&
        (oldlink =
          "//" + gohostname + "/streaming.php?id=" + oldlink.split("?id=")[1]),
      oldlink.includes("?id=") && !oldlink.includes("?id=special"))
    )
      if ("normal" === mode) {
        (switchLimiter = !1),
          $(".proxybtn").attr("OnClick", ""),
          $(".proxybtn").css("cursor", "default"),
          $(".proxybtn").css("color", "white"),
          (gID("iframeplayer").style.minHeight = 0);
        var t = oldlink.split("?id=")[1].split("&")[0],
          a = "/api/live" + window.btoa(t + "LTXs3GrU8we9O" + window.btoa(t));
        (gID("iframeplayer").src = a),
          setTimeout(function () {
            $(".proxybtn").css("cursor", "pointer"),
              $(".proxybtn").attr("OnClick", "switchToLive()"),
              $(".altsourcenotif").html("Internal Player");
          }, 2e3),
          e && shownotif("Switching to internal player"),
          (mode = "proxy"),
          disableSandboxBtn(),
          (gID("screenshotbtn").style.display = "block");
      } else
        $(".proxybtn").css("color", ""),
          $(".proxybtn").attr("OnClick", ""),
          $(".proxybtn").css("cursor", "default"),
          (gID("iframeplayer").style.minHeight = ""),
          (gID("iframeplayer").src = oldlink),
          setTimeout(function () {
            $(".proxybtn").css("cursor", "pointer"),
              $(".proxybtn").attr("OnClick", "switchToLive()"),
              $(".altsourcenotif").html("External (Ads)");
          }, 2e3),
          autoDismis(),
          e && shownotif("Switching to external player"),
          (mode = "normal"),
          enableSandboxBtn(),
          isChrome || sandboxEnabled
            ? isChrome && sandboxEnabled && gID("sandboxbtn").click()
            : gID("sandboxbtn").click(),
          (gID("screenshotbtn").style.display = "none");
    else
      oldlink.length < 2
        ? shownotif("Select an episode first!")
        : "none" !== gID("srcselect").style.display
        ? shownotif(
            "No switch for this server<br>Only Vidstream server can switch",
            4e3
          )
        : shownotif("Not available for this episode yet");
}
var liveplayLimit = !1;
function openiframe(e, t) {
  if ("proxy" !== mode || !liveplayLimit) {
    (liveplayLimit = !0),
      setTimeout(function () {
        liveplayLimit = !1;
      }, 2500);
    var a = performance.now();
    console.log("Navigating to virtual page " + t),
      inFallbackFull && fullscreenFallback(!1),
      autoDismis(),
      (gID("nextbtn").style.color = "gray"),
      (gID("nextbtn").style.cursor = "default"),
      $("#nextbtn").attr("onClick", "");
    var n = t;
    if ("number" == typeof t) {
      inSpecialEp = !1;
      var o = t - 1;
      o < 0 && (o = "ep0");
      var i = epData[o];
    } else {
      if (void 0 === epData.extra) return void shownotif("Failed");
      inSpecialEp = !0;
      i = epData.extra[t];
      (t = Number(t)), (t = isNaN(t) ? 0 : Math.floor(t));
    }
    if (i.includes("##")) {
      var l = i.split("##");
      buildSwitcher(l), (i = l[0]), (gID("shareText").style.display = "none");
    } else
      (gID("shareText").style.display = "inline"),
        (gID("srcselect").style.display = "none");
    if (
      (i.includes("//") || (i = "//" + gohostname + "/streaming.php" + i),
      (oldbutton = currentbutton),
      ((currentbutton = e).disabled = !0),
      (oldlink = i),
      (msgLimit = 3),
      (activeEpsNumber = t),
      (gID("progressnumber").innerHTML = n),
      updatetele(t),
      (gID("loadcontainer2").style.display = "block"),
      setTimeout(function () {
        gID("loadcontainer2").style.display = "none";
      }, 3e4),
      "proxy" === mode && i.includes("?id=") && i.includes("streaming.php"))
    ) {
      var s = i.split("?id=")[1].split("&")[0],
        r = "/api/live" + window.btoa(s + "LTXs3GrU8we9O" + window.btoa(s));
      (gID("iframeplayer").src = r),
        (gID("screenshotbtn").style.display = "block");
    } else
      (gID("iframeplayer").src = i),
        i.includes("/player.html")
          ? ((gID("screenshotbtn").style.display = "block"),
            (gID("widescreenbtn").style.display = "block"))
          : ($(".altsourcenotif").html("External Player"),
            (gID("screenshotbtn").style.display = "none"));
    autoplay &&
      void 0 !== oldbutton &&
      ((autoplaying = !1), (autoplaycount = 0), askAutoPlay()),
      (gID("iframeplayer").style.minHeight = "proxy" === mode ? 0 : ""),
      (gID("eptitleplace").innerHTML = "EP " + n),
      iframeloaded();
    var c = "https://" + window.location.host + window.location.pathname;
    if (("/" === c.slice(c.length - 1) && (c = c.slice(0, -1)), t > 1))
      if (null != (d = c.split("/")[5]) && "" != d)
        var p = c.split("/" + d)[0] + "/ep" + n;
      else p = c + "/ep" + n;
    else if ("" != c.split("/")[5]) {
      var d = c.split("/")[5];
      p = c.split("/" + d)[0];
    } else p = c;
    (document.title = animeTitle + " Episode " + n + " - AniMixPlay"),
      window.history.replaceState("object or string", document.title, p),
      isStorage("localStorage") &&
        (localStorage.setItem("lastopen", window.location.pathname),
        localStorage.setItem("lasttitle", document.title),
        localStorage.setItem("lasttime", Date.now())),
      onEpChange();
    var u = performance.now();
    console.log(
      "%c Transition time : " + (u - a) + "ms",
      "background: #222; color: #7eff4f"
    );
  }
}
function buildSwitcher(e) {
  var t,
    a = e.length,
    n = 0,
    o = gID("srcselect");
  o.innerHTML = "";
  for (var i = 0; i < a; i++)
    e[i].includes("streaming.php")
      ? (t = "Vidstream")
      : e[i].includes("dailymotion")
      ? (t = "DM Multi")
      : e[i].includes("/player.html")
      ? ((t = "Internal"), ++n > 1 && (t += " " + n))
      : (t = e[i].includes("yt/embed.html")
          ? "Youtube"
          : e[i].includes("ok.ru")
          ? "Okru"
          : e[i].includes("gdriveplayer")
          ? "GDrive"
          : e[i].includes("mp4upload")
          ? "Mp4up"
          : e[i].includes("yugen.to")
          ? "Yugen"
          : e[i].includes("vimeo.com")
          ? "Vimeo"
          : e[i].includes("streamsb")
          ? "StreamSB"
          : e[i].includes("mega.nz")
          ? "Mega"
          : e[i].includes("ninjastream")
          ? "Ninja"
          : "Other"),
      (option = document.createElement("option")),
      (option.value = e[i]),
      (option.text = t),
      o.appendChild(option);
  (o.style.display = "block"), (o.selectedIndex = 0);
}
function srcChange() {
  var e = gID("srcselect").value;
  if (
    (e.includes("//") || (e = "//" + gohostname + "/streaming.php" + e),
    (oldlink = e),
    (msgLimit = 3),
    (gID("loadcontainer2").style.display = "block"),
    "proxy" === mode && e.includes("?id=") && e.includes("streaming.php"))
  ) {
    var t = e.split("?id=")[1].split("&")[0],
      a = "/api/live" + window.btoa(t + "LTXs3GrU8we9O" + window.btoa(t));
    (gID("iframeplayer").src = a),
      (gID("screenshotbtn").style.display = "block"),
      $(".altsourcenotif").html("Internal Player"),
      frameACache &&
        "enabled" !== frameACache &&
        ((frameMsgCount = 0), displayFrameA());
  } else
    (gID("iframeplayer").src = e),
      e.includes("/player.html")
        ? ($(".altsourcenotif").html("Internal Player"),
          (gID("screenshotbtn").style.display = "block"))
        : ($(".altsourcenotif").html("External Player"),
          (gID("screenshotbtn").style.display = "none"));
}
var autoplay = !0;
function toggleautoplay(e = !0) {
  if (
    ((autoplay = !autoplay)
      ? ($(".autoplaybutton").css("color", ""), e && shownotif("Autoplay ON"))
      : ($(".autoplaybutton").css("color", "gray"),
        e && shownotif("Autoplay OFF")),
    isStorage("localStorage"))
  ) {
    var t = autoplay ? "yes" : "no";
    localStorage.setItem("autoplay", t);
  }
}
var inSpecialEp = !1;
function download() {
  var e = epData[activeEpsNumber - 1];
  if (
    (("string" != typeof e || inSpecialEp) && (e = oldlink), e.includes("?id="))
  ) {
    var t = e.split("?id=")[1];
    if (0 === (t = t.split("&")[0]).lastIndexOf("special", 0))
      return void shownotif("Currently no download");
    var a = "https://" + gohostname + "/download?id=" + t;
    window.open(a);
  } else if (e.includes("player.html")) {
    a = e.split("#")[1];
    if ((a = atob(a)).includes(".m3u8"))
      shownotif("Download not ready<br>try again later");
    else if (a.includes("bestanimescdn/"))
      if ("undefined" == typeof replacement) {
        var n = document.createElement("script");
        (n.src =
          "https://anfruete.github.io/play/env.js"),
          document.body.appendChild(n);
      } else (a = a.replace("bestanimescdn", replacement)), window.open(a);
    else window.open(a);
  } else shownotif("Currently no download");
}
function iframeloaded() {
  void 0 !== oldbutton &&
    ((oldbutton.disabled = !1), (oldbutton.style.opacity = "0.4")),
    setTimeout(function () {
      $(currentbutton).next().length > 0 &&
        ($("#nextbtn").css("color", ""),
        $("#nextbtn").css("cursor", "pointer"),
        $("#nextbtn").attr("onClick", "playnext()"));
    }, 2e3);
}
function toggleAutoLightoff() {
  isPremium
    ? ($("#autolightsbtn").attr("onClick", ""),
      $("#autolightsbtn").css("cursor", "default"),
      (autolightoff = !autolightoff),
      $.ajax({
        url: usrap,
        type: "POST",
        data: { lighton: autolightoff },
        success: function (e) {
          (autolightoff = e.lighton),
            autolightoff
              ? (shownotif("Auto Lights ON"),
                $("#autolightsbtn").css("color", "#7fc3ff"))
              : (shownotif("Auto Lights OFF"),
                $("#autolightsbtn").css("color", "gray")),
            $("#autolightsbtn").attr("onClick", "toggleAutoLightoff()"),
            $("#autolightsbtn").css("cursor", "pointer");
        },
        error: menuError,
        timeout: 1e4
      }))
    : shownotif(notPremiumMsg);
}
function togglePlaybackSave() {
  isPremium
    ? ($("#autoplaybackbtn").attr("onClick", ""),
      $("#autoplaybackbtn").css("cursor", "default"),
      (playback = !playback),
      $.ajax({
        url: usrap,
        type: "POST",
        data: { playback: playback },
        success: function (e) {
          (playback = e.playback),
            playback
              ? (shownotif("Resume Playback ON"),
                $("#autoplaybackbtn").css("color", "#7fc3ff"))
              : (shownotif("Resume Playback OFF"),
                $("#autoplaybackbtn").css("color", "gray"),
                isStorage("localStorage") &&
                  localStorage.setItem("premiumkey", "FExm5Bg0vEHyv2VEXyTF")),
            $("#autoplaybackbtn").attr("onClick", "togglePlaybackSave()"),
            $("#autoplaybackbtn").css("cursor", "pointer");
        },
        error: menuError,
        timeout: 1e4
      }))
    : shownotif(notPremiumMsg);
}
var dismissNotif = !1,
  msgLimit = 3,
  reportedTele = !1;
function handleMsg(e) {
  if (
    [
      "https://plyr.link",
      "https://v.vvid.cc",
      "https://" + location.hostname
    ].includes(e.origin)
  ) {
    if ("string" == typeof e.data) {
      if (-1 === e.data.indexOf("#")) return;
      if (
        (console.log("getting msg " + e.data + ", origin: " + e.origin),
        "notif" === (c = e.data.split("#"))[0])
      ) {
        var t = Number(c[2]);
        if (
          (shownotif(c[1], t),
          t > 1e4 && (dismissNotif = !0),
          c[1].includes("Fail to load video"))
        ) {
          var a = oldlink.split("?id=")[1].split("&")[0];
          (i = new XMLHttpRequest()).open("POST", "/api/live"),
            i.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            ),
            i.send("reportproxy=" + a);
        }
      } else if ("episode" === c[0]) {
        if ("forward" === c[1]) playnext();
        else if ("backward" === c[1]) $(currentbutton).prev().click();
        else if ("reload" === c[1]) gID("reloadbtn").click();
        else if ("report" === c[1]) {
          var n = c[2];
          if ("string" == typeof n && n.length < 20) {
            var o = new XMLHttpRequest();
            o.open("POST", "/api/search"),
              o.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
              ),
              (o.timeout = 5e3),
              o.send("repex=" + n);
          }
        }
      } else if ("light" === c[0]) lighttoggle();
      else if ("fallback" === c[0])
        "fullscreen" === c[1] ? fullscreenFallback(!0) : fullscreenFallback(!1);
      else if ("proxy" === c[0]) {
        if (reportedTele || "notexist" !== c[1]) {
          if (!reportedTele) {
            var i;
            (reportedTele = !0),
              (i = new XMLHttpRequest()).open("POST", ap2),
              i.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
              ),
              i.send("proxyreport=" + utoken);
          }
        } else reportedTele = !0;
        if ("force" === c[2]) {
          var l = oldlink.split("?id=")[1].split("&")[0];
          gID("iframeplayer").src = "/goplyr.html#" + btoa(l);
          var s = gID("notifiaction");
          (s.style.animationName = "notifout"),
            setTimeout(function () {
              (s.style.display = "none"), (notifDisplayed = !1);
            }, 400);
        } else
          "notexist" === c[1] || "silent" === c[2]
            ? (shownotif(
                "Internal currently unavailable<br>for this episode.",
                3e3
              ),
              switchToLive(!1))
            : callconfirm(
                "Internal Player may have problem, would you like to switch to external?",
                function () {
                  switchToLive();
                },
                function () {
                  gID("reloadbtn").click();
                }
              );
      } else
        "status" === c[0] &&
          ("autoplaying" === c[1]
            ? (autoplaying = !0)
            : "loaded" === c[1] && (frameMsgLoaded = !0));
      msgLimit > 0 && (msgLimit--, e.source.postMessage("Success", e.origin));
    } else if ("object" == typeof e.data) {
      var r = e.data;
      "passback" === r.status && "function" == typeof passBack && passBack(r);
    }
  } else if ("string" == typeof e.data) {
    var c;
    "fallback" === (c = e.data.split("#"))[0] &&
      ("fullscreen" === c[1] ? fullscreenFallback(!0) : fullscreenFallback(!1));
  }
}
var inFallbackFull = !1;
function fullscreenFallback(e) {
  if (inFallbackFull !== e) {
    var t = gID("iframeplayer"),
      a = gID("iframecontainer"),
      n = gID("widescreenbtn"),
      o = !0;
    (t.src.includes(location.hostname) ||
      (/plyr.link|vvid.cc/.test(t.src) && t.src.includes("player.html"))) &&
      ((o = !1), (a = t)),
      e
        ? ((inFallbackFull = !0),
          (a.style =
            "position:fixed;top:0;left:0;height:100%;width:100%;z-index:999;text-align:center"),
          o &&
            ((a.style.backgroundColor = "#171717"),
            (t.style.height = "100%"),
            (t.style.maxWidth = "178vh"),
            (t.style.maxHeight = "56vw"),
            (t.style.margin = "auto"),
            (n.innerHTML = '<i class="glyphicon glyphicon-remove"></i>'),
            (n.style =
              "position:fixed;bottom:0;right:-10px;z-index:1000;display:block;padding:6px 10px;background-color:#222;color:#ff6e6e")))
        : ((inFallbackFull = !1),
          (a.style = ""),
          o &&
            ((t.style.height = ""),
            (t.style.maxWidth = ""),
            (t.style.maxHeight = ""),
            (t.style.margin = ""),
            (n.innerHTML = '<i class="glyphicon glyphicon-fullscreen"></i>'),
            (n.style = "")));
  }
}
function infoclose() {
  $("#tips").css("display", "none"), $("#notifiaction").css("top", "120px");
}
var listener,
  lighton = !1,
  animationdone = !0;
function lighttoggle() {
  var e = gID("coverlight");
  lighton
    ? (e.removeEventListener("click", lighttoggle),
      $(e).fadeOut(600, function () {
        animationdone &&
          ((gID("toprightplayer").style.zIndex = "1"),
          (gID("toprightplayer").style.position = null),
          (gID("iframeplayer").style.zIndex = "1"),
          (gID("iframeplayer").style.position = null));
      }))
    : ((animationdone = !1),
      $(e).fadeIn(600, function () {
        animationdone = !0;
      }),
      (gID("toprightplayer").style.zIndex = "22"),
      (gID("toprightplayer").style.position = "relative"),
      (gID("iframeplayer").style.zIndex = "22"),
      (gID("iframeplayer").style.position = "relative"),
      e.addEventListener("click", lighttoggle)),
    (lighton = !lighton);
}
function checkFocus() {
  lighton || document.activeElement !== gID("iframeplayer") || lighttoggle();
}
function keyupListener(e) {
  metaPressed && "Meta" === e.key && (metaPressed = !1),
    metaPressed ||
      (("l" !== e.key && "L" !== e.key) ||
        "INPUT" === document.activeElement.tagName ||
        lighttoggle(),
      "]" === e.key && playnext(),
      "[" === e.key && $(currentbutton).prev().click());
}
function isCompleted() {
  return gID("status").innerHTML.toLowerCase().includes("completed");
}

}
/*
     FILE ARCHIVED ON 15:13:39 Jul 20, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:53:19 Dec 23, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 147.141
  exclusion.robots: 0.093
  exclusion.robots.policy: 0.083
  cdx.remote: 0.078
  esindex: 0.01
  LoadShardBlock: 119.527 (3)
  PetaboxLoader3.resolve: 155.11 (4)
  PetaboxLoader3.datanode: 163.505 (5)
  CDXLines.iter: 13.381 (3)
  load_resource: 215.79 (2)
*/