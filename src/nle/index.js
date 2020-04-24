function VideoEdit() {
  this.app = null; // editor 객체 저장
  this.usernm = this.getParam("usernm"); // 사용자명
  this.id = this.getParam("refid"); // 컨텐츠 아이디
  this.endframe = Math.floor(
    Number(this.getParam("runtime")) * Number(this.getParam("framerate"))
  );
  this.videourl = this.getParam("video_url");
  this.thumburl = this.getParam("thumb_url");
  this.title = this.getParam("title"); // 컨텐츠 제목
  this.duration = this.getParam("duration"); // 컨텐츠 영상 재생시간
  this.init();
}

VideoEdit.prototype = {
  init: function () {
    var that = this;

    this.app = new gvEditor({
      target_id: "app",
      use_search_panel: false,
      title: "Video Web Cut Editor",
      userinfo: {
        usernm: that.usernm
      },
      exportbtn: {
        evt: that.onExport
      }
    });
    this.addItem();
  },

  onExport: function (_) {
    try {
      var editedData = this.getEditedDatas();
      var parsedEditedData = JSON.parse(editedData);
      if (parsedEditedData) {
        console.log(parsedEditedData);
      } else {
        alert("영상을 편집해야 합니다.");
      }
    } catch (e) {
      console.log(e);
    }
  },

  getEditedDatas: function (_) {
    return this.app.exportDatas();
  },

  addItem: function (_) {
    var that = this;
    this.app.addItem({
      type: "video",
      startframe: 0,
      endframe: that.endframe,
      url: "http://localhost:3001/videos/" + decodeURIComponent(that.videourl),
      thumb_url:
        "http://localhost:3001/images/" + decodeURIComponent(that.thumburl),
      title: that.title,
      ref_id: that.id,
      origin: {
        duration: that.duration,
        tot_framecnt: that.endframe
      }
    });
  },

  clearEditTimeline: function (_) {
    this.app.clearEditTmeline();
  },

  getParam: function (sname) {
    var params = decodeURIComponent(location.search).substr(
      location.search.indexOf("?") + 1
    );
    var sval = false;
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
      temp = params[i].split("=");
      if ([temp[0]] == sname) {
        sval = temp[1];
      }
    }
    return sval;
  }
};

new VideoEdit();
