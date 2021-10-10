import Video from '../models/Video';

// 1. return의 역할 : 본질적인 return의 역할보다는 function을 마무리짓는 역할로 사용되고 있음.
// - 이러한 경우 return이 없어도 정상적으로 동작하지만 실수를 방지하기 위해 return을 사용
// 2. render한 것은 다시 render할 수 없음
// - redirect(), sendStatus(), end() 등등 포함 (express에서 오류 발생)

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);

    return res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    return res.render('server-error', { error });
  }
}; // render : (pug) html template engine rendering

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }

  return res.render('watch', { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }
  return res.render('edit', { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;

  // findById의 Object로 받는대신 exists를 통해서 filter로 받는다. (true or false)
  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags.split(',').map((word) => (word.startsWith('#') ? word : `#${word}`)),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video' });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;

  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(',').map((word) => `#${word}`),
    });
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.render('upload', { pageTitle: 'Upload Video', errorMessage: error._message });
  }
};
