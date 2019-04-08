module.exports = (function(e) {
  var t = {};
  function o(n) {
    if (t[n]) return t[n].exports;
    var i = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(i.exports, i, i.exports, o), (i.l = !0), i.exports;
  }
  return (
    (o.m = e),
    (o.c = t),
    (o.d = function(e, t, n) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (o.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function(e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (o.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          o.d(
            n,
            i,
            function(t) {
              return e[t];
            }.bind(null, i)
          );
      return n;
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 2))
  );
})([
  function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = o(8),
      i = o(9),
      r = o(10),
      a = o(11),
      s = o(1),
      p = "http://127.0.0.1",
      c = {
        SUCCESS: "SUCCESS",
        FAIL: "FAIL",
        CANCEL: "CANCEL",
        REQUEST: "REQUEST",
        PENDING: "PENDING",
        EXPIRED: "EXPIRED"
      };
    let l, u;
    class d extends i {
      constructor(e) {
        super(), (this.onUpdate = e);
      }
      getPort() {
        return this.port;
      }
      update(e) {
        (this.port = e), this.onUpdate(e), this.emit("update", e);
      }
      reset() {
        this.port = void 0;
      }
    }
    (t.idePortManager = new d(e => (l = e))),
      (t.cliPortManager = new d(e => (u = e)));
    let m = 3799;
    function f(e) {
      let t = m,
        o = n.createServer(() => {});
      o.on("error", t => {
        m++, f(e);
      }),
        o.listen(t, "127.0.0.1", n => {
          o.once("close", () => {
            (m = t + 1), e(t);
          }),
            o.close();
        });
    }
    function g() {
      return new Promise((e, o) => {
        l
          ? e(l)
          : t.idePortManager.once("update", t => {
              e(t);
            });
      });
    }
    function h(e, o) {
      return new Promise(async (n, i) => {
        try {
          const r = await a({
            url: `${p}:${o}/updatePort?port=${e}`,
            timeout: 1e3,
            resolveWithFullResponse: !0
          });
          200 === r.statusCode
            ? (t.idePortManager.update(o), n())
            : (console.error("err:", r), i(r.status));
        } catch (e) {
          e && e.error && ("ETIMEOUT" === e.error.code || e.error.code), i(e);
        }
      });
    }
    function w(e) {
      const t = e.length,
        o = e.match(/.+?\n/g),
        n = e.match(/[^\n]+?$/);
      if (!o) return void console.log(e);
      const i = (function(e, t) {
        let o = 1;
        for (; e / o > 8e3; ) o++;
        if (1 == o) return [];
        let n = t.length + 1,
          i = Math.floor(n / o),
          r = [];
        for (let e = 1; e < o; e++) r.push(i * e);
        return r;
      })(t, o);
      if (0 === i.length) console.log(e);
      else {
        for (var r = 0; r < i.length; r++)
          console.log(
            o
              .slice(i[r - 1] || 0, i[r])
              .join("")
              .slice(0, -1)
          );
        console.log(o.slice(i[i.length - 1]).join("") + n);
      }
    }
    function v() {
      const e = { cli: "1" };
      return global.from && (e.from = global.from), new r.URLSearchParams(e);
    }
    (t.getAvailablePort = function() {
      return new Promise(f);
    }),
      (t.startServer = function(e) {
        return new Promise((o, i) => {
          try {
            n
              .createServer((e, o) => {
                try {
                  if (!e.url) return;
                  const i = e.url.match(/^\/updatePort\?port=(\d+)$/);
                  if (i && i[1] && parseInt(i[1]) && !isNaN(parseInt(i[1]))) {
                    const e = parseInt(i[1]);
                    t.idePortManager.update(e),
                      console.log(
                        `IDE server has started, listening on http://127.0.0.1:${e}`
                      ),
                      (o.statusCode = 200),
                      o.end();
                  } else
                    n.request(
                      { host: p, port: l, path: e.url, method: e.method },
                      e => {
                        e.pipe(o);
                      }
                    ).end();
                } catch (e) {
                  o.end();
                }
              })
              .listen(e, "127.0.0.1"),
              o();
          } catch (e) {
            i(e);
          }
        });
      }),
      (t.getIDEPort = g),
      (t.notifyCLIPort = h),
      (t.openIDE = function(e) {
        return new Promise(async (t, o) => {
          try {
            const n = await g(),
              i = v();
            e && i.set("projectpath", encodeURIComponent(e)),
              200 ===
              (await a({
                url: `${p}:${n}/open?${i.toString()}`,
                resolveWithFullResponse: !0
              })).statusCode
                ? t()
                : o(new Error("Fail to open IDE"));
          } catch (e) {
            o(e);
          }
        });
      }),
      (t.checkIDEStatus = function() {
        return new Promise(async (e, o) => {
          if (l)
            try {
              await h(u, l), e(s.IDEStatus.Online);
            } catch (o) {
              e(s.IDEStatus.Offline), t.idePortManager.reset();
            }
          else e(s.IDEStatus.Offline), t.idePortManager.reset();
        });
      }),
      (t.login = e =>
        new Promise(async (t, o) => {
          let { qrFormat: n, qrOutput: i, resultOutput: r } = e;
          const s = await g();
          try {
            n = n || "terminal";
            const e = v();
            e.set("format", n),
              i && e.set("qroutput", encodeURIComponent(i)),
              r && e.set("resultoutput", encodeURIComponent(r));
            const t = await a({ url: `${p}:${s}/login?${e.toString()}` });
            i || w(t);
          } catch (e) {
            o(e.toString());
          }
          try {
            await new Promise((e, t) => {
              !(async function e(t, o) {
                try {
                  let n = await a({ url: `${p}:${s}/loginresult` });
                  if (n)
                    switch ((n = JSON.parse(n)).loginStatus) {
                      case c.SUCCESS:
                        t();
                        break;
                      case c.PENDING:
                        setTimeout(e.bind(this), 300, t, o);
                        break;
                      case c.CANCEL:
                        o("login cancelled " + n.loginStatusMsg);
                        break;
                      case c.EXPIRED:
                        o("login expired " + n.loginStatusMsg);
                        break;
                      case c.FAIL:
                      default:
                        o("login failed " + n.loginStatusMsg);
                    }
                  else o("Error while getting login result");
                } catch (e) {
                  o(e);
                }
              })(e, t);
            });
          } catch (e) {
            o(e.toString());
          }
          t();
        })),
      (t.preview = e =>
        new Promise(async (t, o) => {
          const {
            projectpath: n,
            format: i = "terminal",
            qroutput: r,
            infoOutput: s,
            compileCondition: c
          } = e;
          if (!n) return void o("project path must be provided");
          const l = await g();
          try {
            const e = v();
            e.set("projectpath", encodeURIComponent(n)),
              e.set("format", i),
              e.set("qroutput", encodeURIComponent(r || "")),
              e.set("infooutput", encodeURIComponent(s || "")),
              e.set("compilecondition", encodeURIComponent(c || ""));
            const u = await a({ url: `${p}:${l}/preview?${e.toString()}` });
            r || w(u), t();
          } catch (e) {
            o(e.toString());
          }
        })),
      (t.autoPreview = e =>
        new Promise(async (t, o) => {
          const { projectpath: n, infoOutput: i, compileCondition: r } = e;
          if (!n) return void o("project path must be provided");
          const s = await g();
          try {
            const e = v();
            e.set("projectpath", encodeURIComponent(n)),
              e.set("infooutput", encodeURIComponent(i || "")),
              e.set("compilecondition", encodeURIComponent(r || ""));
            const c = await a({
              url: `${p}:${s}/autopreview?${e.toString()}`,
              resolveWithFullResponse: !0
            });
            200 !== c.statusCode ? o(c.body) : console.log(c.body), t();
          } catch (e) {
            o(e.toString());
          }
        })),
      (t.upload = e =>
        new Promise(async (t, o) => {
          const {
            projectpath: n,
            version: i,
            desc: r,
            format: s = "terminal",
            qroutput: c,
            infoOutput: l
          } = e;
          if (!n || !i)
            return void o("version and project path must be provided");
          const u = await g();
          try {
            const e = v();
            e.set("projectpath", encodeURIComponent(n)),
              e.set("version", encodeURIComponent(i)),
              e.set("desc", encodeURIComponent(r || "")),
              e.set("infooutput", encodeURIComponent(l || ""));
            const s = await a({
              url: `${p}:${u}/upload?${e.toString()}`,
              resolveWithFullResponse: !0
            });
            200 !== s.statusCode && o(s.body), c || console.log(s.body), t();
          } catch (e) {
            o(e);
          }
        })),
      (t.autoTest = e =>
        new Promise(async (t, o) => {
          const { projectpath: n } = e;
          if (!n) return void o("project path must be provided");
          const i = await g();
          try {
            const e = v();
            e.set("projectpath", encodeURIComponent(n));
            const r = await a({
              url: `${p}:${i}/test?${e.toString()}`,
              resolveWithFullResponse: !0
            });
            200 !== r.statusCode && o(r.body), t();
          } catch (e) {
            o(e && e.error);
          }
        })),
      (t.getMinicode = e =>
        new Promise(async (t, o) => {
          const { link: n, dest: i } = e;
          if (!n || !i)
            return void o("minicode link / ID & target dir must be provided");
          const r = await g();
          try {
            const e = v();
            e.set("link", encodeURIComponent(n)),
              e.set("dest", encodeURIComponent(i));
            const s = await a({
              url: `${p}:${r}/minicode?${e.toString()}`,
              resolveWithFullResponse: !0
            });
            200 !== s.statusCode && o(s.body), t();
          } catch (e) {
            o(e && e.error);
          }
        })),
      (t.buildNpm = e =>
        new Promise(async (t, o) => {
          const { projectpath: n, compiletype: i } = e;
          if (!n) return void o("project path must be provided");
          const r = await g();
          try {
            const e = v();
            e.set("projectpath", encodeURIComponent(n)),
              e.set("compiletype", encodeURIComponent(i || ""));
            const s = await a({
              url: `${p}:${r}/buildnpm?${e.toString()}`,
              resolveWithFullResponse: !0
            });
            200 !== s.statusCode ? o(s.body) : console.log(s.body), t();
          } catch (e) {
            o(e && e.error);
          }
        }));
  },
  function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (function(e) {
        (e[(e.Online = 0)] = "Online"), (e[(e.Offline = 1)] = "Offline");
      })(t.IDEStatus || (t.IDEStatus = {}));
  },
  function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = o(3),
      i = o(4),
      r = o(5),
      a = o(6),
      s = o(0),
      p = "darwin" === process.platform;
    process.on("uncaughtException", e => {
      console.error(`Runtime error: ${e.name} \n ${e.toString()}`);
    }),
      (async function() {
        try {
          const e = process.argv.indexOf("--idev") > -1;
          global.isDev = e;
          try {
            if (e)
              if (p) {
                const e = JSON.parse(
                  n.readFileSync(
                    i.join(__dirname, "../../../../../dist/package.json"),
                    "utf8"
                  )
                );
                (global.userDirName = e.name),
                  (global.appname = e.appname),
                  (global.userDirPath = i.join(
                    process.env.HOME || "~",
                    `Library/Application Support/${global.userDirName}/Default`
                  )),
                  (global.appPath = `../../../MacOS/${global.appname}`);
              } else {
                const e = JSON.parse(
                  n.readFileSync(
                    i.join(__dirname, "../../../../../dist/package.json"),
                    "utf8"
                  )
                );
                (global.userDirName = e.name),
                  (global.appname = e.name),
                  (global.userDirPath = i.join(
                    process.env.HOME || "~",
                    `.config/${global.userDirName}/Default`
                  )),
                  (global.appPath = i.join(__dirname, "../../../../bin/wxdt"));
              }
            else if (p) {
              const e = JSON.parse(
                n.readFileSync(
                  i.join(__dirname, "../../../package.json"),
                  "utf8"
                )
              );
              (global.userDirName = e.name),
                (global.appname = e.appname),
                (global.userDirPath = i.join(
                  process.env.HOME || "~",
                  `Library/Application Support/${global.userDirName}/Default`
                )),
                (global.appPath = i.join(
                  __dirname,
                  `../../../../../MacOS/${global.appname}`
                ));
            } else {
              const e = JSON.parse(
                n.readFileSync(
                  i.join(__dirname, "../../../package.json"),
                  "utf8"
                )
              );
              (global.userDirName = e.name),
                (global.appname = e.name),
                (global.userDirPath = i.join(
                  process.env.HOME || "~",
                  `.config/${global.userDirName}/Default`
                )),
                (global.appPath = i.join(__dirname, "../../../../bin/wxdt"));
            }
          } catch (e) {
            console.log("File corrupted, please re-install");
          }
          const t = process.argv.slice();
          let o,
            c = "",
            l = t.indexOf("--inspect");
          l > -1 && t.splice(l, 1),
            (l = t.indexOf("--idev")) > -1 && t.splice(l, 1),
            (l = t.indexOf("--nw")) > -1 && t.splice(l, 2),
            (l = t.indexOf("-f")) > -1
              ? ((c = t[l + 1]), t.splice(l, 2))
              : (l = t.indexOf("--from")) > -1 &&
                ((c = t[l + 1]), t.splice(l, 2)),
            c && (global.from = c),
            r
              .version("1.0.0")
              .allowUnknownOption()
              .option(
                "-o, --open [path]",
                "Open IDE. If path is specified, IDE will try to open the project in the path."
              )
              .option("-l, --login", "Login")
              .option(
                "--login-qr-output [format@path]",
                "Customize output of QR Code. format can be terminal or base64 or image. If path is used, QR code will be written to the path"
              )
              .option(
                "--login-result-output <path>",
                "Customize output of login result, login result will be written to the provided path"
              )
              .option("-p, --preview <project_root>", "Preview mini program")
              .option(
                "--preview-qr-output [format@path]",
                "Customize output of QR Code. format can be terminal or base64. If path is used, QR code will be written to the path"
              )
              .option(
                "--preview-info-output [path]",
                "Output path of extra information generated during preview, such as package size including subpackages. Output format is JSON"
              )
              .option(
                "--compile-condition <condition>",
                "set the compile condiction for preview"
              )
              .option(
                "--auto-preview <project_root>",
                "Auto-Preview mini program"
              )
              .option(
                "--auto-preview-info-output [path]",
                "Output path of extra information generated during preview, such as package size including subpackages. Output format is JSON"
              )
              .option(
                "--compile-condition <condition>",
                "set the compile condiction for preview"
              )
              .option(
                "-u, --upload <version@project_root>",
                "Upload mini program"
              )
              .option(
                "--upload-desc <desc>",
                "Description of the uploaded version"
              )
              .option(
                "--upload-info-output [path]",
                "Output path of extra information generated during upload, such as package size including subpackages. Output format is JSON"
              )
              .option(
                "-t, --test <project_root>",
                "Request an auto mobile test"
              )
              .option(
                "--get-minicode <link@path>",
                "get minicode and download to target directory"
              )
              .option("--build-npm <project_root>", "Build NPM")
              .option(
                "--build-npm-compile-type <type>",
                'Override the compile type ("miniprogram" or "plugin") in project.config.json only for building NPM'
              )
              .parse(t),
            console.info("Initializing...");
          try {
            (o = await s.getAvailablePort()),
              s.cliPortManager.update(o),
              await s.startServer(o);
            let t = global.userDirPath,
              r = i.join(t, ".cli");
            try {
              n.writeFileSync(r, o, "utf8");
            } catch (e) {
              throw (console.error(
                "Please ensure that the IDE has been properly installed"
              ),
              e);
            }
            let p,
              c,
              l = i.join(t, ".ide"),
              u = i.join(t, ".ide-status");
            try {
              c = n.readFileSync(u, "utf8");
            } catch (e) {}
            "On" !== `${c}`.trim() &&
              (console.error(
                "IDE service port disabled. To use CLI Call, open IDE -> Settings -> Security Settings, and set Service Port On.\nFor more details see: https://developers.weixin.qq.com/miniprogram/en/dev/devtools/cli.html"
              ),
              console.error(
                "工具的服务端口已关闭。要使用命令行调用工具，请打开工具 -> 设置 -> 安全设置，将服务端口开启。\n详细信息: https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html"
              ),
              process.exit(-1));
            try {
              console.log(`idePortFile: ${l}`),
                (p = parseInt(n.readFileSync(l, "utf8"))),
                await s.notifyCLIPort(o, p),
                console.log(
                  `IDE server has started, listening on http://127.0.0.1:${p}`
                );
            } catch (t) {
              console.info("starting ide..."), a.start(o, e);
            }
            await s.getIDEPort(), console.log("initialization finished");
          } catch (e) {
            return void console.error("init error: ", e);
          }
          if (
            (r.open &&
              ("boolean" == typeof r.open
                ? await a.open()
                : await a.open(r.open),
              console.log("open IDE success")),
            r.login)
          ) {
            console.info("initializing login...");
            const e = {};
            if (r.loginQrOutput) {
              const t = r.loginQrOutput,
                o = (t.match && t.match(/^(.+?)(?:@(.*))?$/)) || [];
              (e.qrFormat = o[1]), (e.qrOutput = o[2]);
            }
            r.loginResultOutput && (e.resultOutput = r.loginResultOutput),
              await s.login(e),
              console.log("login success");
          }
          if (r.preview) {
            console.info("preparing preview...");
            const e = { projectpath: decodeURIComponent(r.preview) };
            if (r.previewQrOutput) {
              const t = r.previewQrOutput,
                o = (t.match && t.match(/^(.+?)(?:@(.*))?$/)) || [];
              (e.format = o[1]), (e.qroutput = o[2]);
            }
            r.previewInfoOutput && (e.infoOutput = r.previewInfoOutput),
              r.compileCondition && (e.compileCondition = r.compileCondition),
              await s.preview(e),
              console.log("preview success");
          }
          if (r.autoPreview) {
            console.info("preparing auto-preview...");
            const e = { projectpath: decodeURIComponent(r.autoPreview) };
            r.autoPreviewInfoOutput && (e.infoOutput = r.autoPreviewInfoOutput),
              r.compileCondition && (e.compileCondition = r.compileCondition),
              await s.autoPreview(e),
              console.log("auto-preview success");
          }
          if (r.upload) {
            console.info("uploading project...");
            const e = r.upload,
              t = (e.match && e.match(/^(.+?)(?:@(.*))?$/)) || [],
              o = {
                version: t[1],
                projectpath: decodeURIComponent(t[2]),
                desc: r.uploadDesc
              };
            if (r.uploadQrOutput) {
              const e = r.uploadQrOutput,
                t = (e.match && e.match(/^(.+?)(?:@(.*))?$/)) || [];
              (o.format = t[1]), (o.qroutput = t[2]);
            }
            r.uploadInfoOutput && (o.infoOutput = r.uploadInfoOutput),
              await s.upload(o),
              console.log("upload success");
          }
          if (r.test) {
            console.info("test project...");
            const e = r.test;
            e && !0 !== e
              ? (await s.autoTest({ projectpath: decodeURIComponent(r.test) }),
                console.log("submit test success"))
              : console.log("projectpath must be provided");
          }
          if (r.getMinicode) {
            console.info("get minicode...");
            const e = r.getMinicode,
              t = (e.match && e.match(/^(.+?)(?:@(.*))?$/)) || [],
              o = { link: t[1], dest: t[2] };
            await s.getMinicode(o), console.log("getMinicode success");
          }
          if (r.buildNpm) {
            console.info("building npm...");
            const e = {
              projectpath: decodeURIComponent(r.buildNpm),
              compiletype: r.buildNpmCompileType
            };
            await s.buildNpm(e), console.log("build npm success", r.buildNpm);
          }
          r.interactive || r.server || process.exit(0);
        } catch (e) {
          console.error(e), process.exit(-1);
        }
      })();
  },
  function(e, t) {
    e.exports = require("fs");
  },
  function(e, t) {
    e.exports = require("path");
  },
  function(e, t) {
    e.exports = require("commander");
  },
  function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    const n = o(7),
      i = o(0),
      r = o(1),
      a = (process.platform, "../../../../dist");
    (t.start = (e, t) => {
      if (t) {
        let t,
          o = process.argv.indexOf("--nw");
        t = o > -1 ? process.argv[o + 1] : "nw";
        const i = process.argv.indexOf("--inspect") > -1;
        n.spawn(t, [".", "--cli", e.toString(), i ? "--inspect" : ""], {
          cwd: a,
          detached: !0,
          stdio: [0, 1, 2]
        }).unref();
      } else {
        n.spawn(global.appPath, ["--cli", e.toString()], {
          detached: !0,
          stdio: "ignore"
        }).unref();
      }
    }),
      (t.open = e =>
        new Promise(async (o, n) => {
          try {
            if ((await i.checkIDEStatus()) === r.IDEStatus.Offline) {
              const o = i.cliPortManager.getPort();
              o
                ? (t.start(o, process.argv.indexOf("--idev") > -1),
                  await i.getIDEPort(),
                  await i.openIDE(e))
                : n("CLI error");
            } else await i.openIDE(e), o();
          } catch (e) {
            n(e ? e.toString() : "");
          }
        }));
  },
  function(e, t) {
    e.exports = require("child_process");
  },
  function(e, t) {
    e.exports = require("http");
  },
  function(e, t) {
    e.exports = require("events");
  },
  function(e, t) {
    e.exports = require("url");
  },
  function(e, t) {
    e.exports = require("request-promise-native");
  }
]);
