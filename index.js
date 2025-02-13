$(function () {
  // 常用 DOM 元素
  const $menuUl = $(".main_buttons").empty();
  const $userInfo = $(".user_info"),
    $dropdown = $(".dropdown-menu"),
    $document = $(document),
    $rightBody = $(".right_body");

  const menuItems = [
    { name: "测试1", icon: "./images/listItem.svg" },
    { name: "测试2", icon: "./images/listItem.svg" },
    { name: "测试3", icon: "./images/listItem.svg" },
    { name: "测试4", icon: "./images/listItem.svg" },
  ];
  menuItems.forEach((item) => {
    const $li = $('<li class="leftbar_list_item menu_item transition"></li>');
    $li.append(`<img src="${item.icon}" alt="menu" class="menu_icon" />`);
    $li.append(item.name);
    $menuUl.append($li);
  });

  // 用户下拉菜单事件逻辑
  $userInfo.on("click", function (e) {
    e.stopPropagation();
    $dropdown.toggleClass("hidden");
  });
  $document.on("click", function () {
    if (!$dropdown.hasClass("hidden")) {
      $dropdown.addClass("hidden");
    }
  });

  function generateContentList(items) {
    return items
      .map(
        (item) => `
      <div class="content_list_item transition" data-url="${
        item.jumpUrl || ""
      }">
        <div class="thumb">
          <img src="${item.thumb}" alt="listItem" class="thumb_icon" />
        </div>
        <div class="thumb_title">
          <div class="thumb_info">
            <div class="thumb_name truncate">${item.name}</div>
            <div class="last_time truncate">更新于 ${item.updateTime}</div>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  const tabContents = {
    0: (() => {
      const items = [
        {
          name: "新文件",
          thumb: "./images/logo.svg",
          updateTime: `${new Date().toLocaleString()}`,
          jumpUrl: "https://www.fullspeed.cn/",
        },
        {
          name: "新文件2",
          thumb: "./images/logo.svg",
          updateTime: `${new Date().toLocaleString()}`,
        },
        {
          name: "新文件3",
          thumb: "./images/logo.svg",
          updateTime: `${new Date().toLocaleString()}`,
        },
      ];
      return `<div class="content_container">${generateContentList(
        items
      )}</div>`;
    })(),
    1: `<div class="content_container">Panel 2 Content</div>`,
    2: `<div class="content_container">Panel 3 Content</div>`,
    3: `<div class="content_container">Panel 4 Content</div>`,
  };

  // 左侧菜单点击
  $(".main_buttons").on("click", ".leftbar_list_item", function (e) {
    e.stopPropagation();
    $(".leftbar_list_item").removeClass("active");
    $(this).addClass("active");

    const index = $(this).index();
    $rightBody.empty().append(tabContents[index] || "");
  });

  // 默认选中第一个tab
  $(".main_buttons").find(".leftbar_list_item").first().trigger("click");

  $(".logo")
    .off("click")
    .on("click", function () {
      window.open("https://www.fullspeed.cn/", "_blank");
    });

  $(".right_body").on("click", ".content_list_item", function (e) {
    const url = $(this).data("url");
    if (url) {
      window.open(url, "_blank");
    }
  });
});
