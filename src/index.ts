
const linkTo = (puth: string) => {
  console.log(puth)
}

const winOpen = (url: string) => {
  let openShow = false;
  try {
    const openInit = window.open(url);
    if (openInit === null) {
      openShow = true;
    }
  } catch (e) {
    console.log(e);
    openShow = true;
  }
  if (openShow) {
    console.error('请先确认网站是否被拦截，如果是请关闭网站拦截');
  }
}

export {
  linkTo,
  winOpen
}