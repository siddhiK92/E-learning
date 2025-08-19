import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [Image, setImage] = useState(null);

  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  // ---------- Handle Chapters ----------
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt("Enter chapter name: ");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  // ---------- Handle Lectures ----------
  const handleAddLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl) {
      alert("Please fill all lecture fields");
      return;
    }

    setChapters(
      chapters.map((chapter) =>
        chapter.chapterId === currentChapterId
          ? {
              ...chapter,
              chapterContent: [...chapter.chapterContent, { ...lectureDetails, lectureId: uniqid() }],
            }
          : chapter
      )
    );

    // reset & close
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleRemoveLecture = (chapterId, lectureId) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.chapterId === chapterId
          ? {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((lec) => lec.lectureId !== lectureId),
            }
          : chapter
      )
    );
  };

  const handleLecture = (action, chapterId) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault()
  };



  // ---------- Quill Editor ----------
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form onSubmit={HandleSubmit} className="w-full max-w-4xl space-y-6">
        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <label>Course Title</label>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-1">
          <label>Course Description</label>
          <div
            ref={editorRef}
            className="border border-gray-300 rounded mt-2"
            style={{ height: '200px' }}
          ></div>
        </div>

        {/* Price, Thumbnail, Discount */}
        <div className="flex flex-wrap gap-6">
          {/* Price */}
          <div className="flex flex-col gap-1">
            <label>Course Price (₹)</label>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-1">
            <label>Discount (%)</label>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder="0"
              min={0}
              max={100}
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="flex flex-col gap-1">
            <label>Course Thumbnail</label>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={assets.file_upload_icon}
                alt="upload"
                className="p-3 bg-blue-500 rounded"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {Image && (
                <img
                  className="max-h-10 rounded"
                  src={URL.createObjectURL(Image)}
                  alt="preview"
                />
              )}
            </label>
          </div>
        </div>

        {/* Adding chapter & lecture */}
        <div >
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className='bg-white border rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`}
                  />
                  <span className='font-semibold'>{chapterIndex + 1}. {chapter.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img
                  onClick={() => handleChapter('remove', chapter.chapterId)}
                  src={assets.cross_icon}
                  alt=""
                  className='cursor-pointer'
                />
              </div>

              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lecture.lectureId} className='flex items-center justify-between mb-2'>
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                        <a href={lecture.lectureUrl} target='_blank' rel="noreferrer" className='text-blue-500'>Link</a> 
                        - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img
                        onClick={() => handleRemoveLecture(chapter.chapterId, lectureIndex)}
                        src={assets.cross_icon}
                        alt=""
                        className='cursor-pointer'
                      />
                    </div>
                  ))}
                  <div
                    className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'
                    onClick={() => handleLecture('add', chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer'
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </div>
        </div>

        {/* Lecture Popup */}
        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
              <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
              
              <div className='mb-2'>
                <p>Lecture Title</p>
                <input
                  type="text"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                />
              </div>

              <div className='mb-2'>
                <p>Duration (minutes)</p>
                <input
                  type="number"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                />
              </div>

              <div className='mb-2'>
                <p>Lecture URL</p>
                <input
                  type="text"
                  className='mt-1 block w-full border rounded py-1 px-2'
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                />
              </div>

              <div className='flex gap-2 my-4'>
                <p>Is Preview Free?</p>
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                />
              </div>

              <button
                type='button'
                onClick={handleAddLecture}
                className='w-full bg-blue-400 text-white px-4 py-2 rounded'
              >
                Add Lecture
              </button>

              <img
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon}
                className='absolute top-4 right-4 w-4 cursor-pointer'
                alt=""
              />
            </div>
          </div>
        )}

        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4' onClick={handleAddLecture}>
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
