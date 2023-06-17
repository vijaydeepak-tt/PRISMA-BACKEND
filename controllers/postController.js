const prisma = require('../prisma');

// create a post
exports.createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;
    // validate for check empty

    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const result = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: `Post with ${id} does not exist`,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: `Post with ${id} does not exist`,
    });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const result = await prisma.post.findMany();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: `No Post's not available`,
    });
  }
};
