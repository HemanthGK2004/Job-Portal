import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef, useState } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('programming');
    const [level, setLevel] = useState('Beginner Level');
    const [salary, setSalary] = useState(0);
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    useEffect(() => {
        //Initialize quill
        if(!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block'],
                        ['clean']
                    ]
                },
                placeholder: 'Job Description'
            });
        }
    }, [editorRef]);

  return (
    <form className='container p-4 flex flex-col gap-4 mx-auto items-start'>
        <div className='w-full'>
            <p className='mb-2'>Job Title</p>
            <input type="text" placeholder='Typer Here' onChange={e=>setTitle(e.target.value)} value={title} required className='w-full p-2 border-2 border-gray-400 rounded-lg max-w-lg px-3 py-2'/>
        </div>
        <div className='w-full max-w-lg'>
            <p className='my-2'>Job Description</p>
            <div ref={editorRef}>
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 w-full'>
            <div>
                <p className='mb-2'>Job category</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setCategory(e.target.value)}>
                    {JobCategories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        <div>
            <div>
                <p className='mb-2'>Job Location</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLocation(e.target.value)}>
                    {JobLocations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
            </div>
        </div>
        <div>
            <div>
                <p className='mb-2'>Job Level</p>
                <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e=>setLevel(e.target.value)}>
                    <option value="Beginner Level">Beginner Level</option>
                    <option value="Intermediate Level">Intermediate Level</option>
                    <option value="Senior Level">Senior Level</option>
                </select>
            </div>
        </div>
        </div>
        <div>
            <p className='mb-2'>Job Salary</p>
            <input className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px] ' min={0} type="number" placeholder='Typer Here' onChange={e=>setSalary(e.target.value)} value={salary} required/>
        </div>
        <button className='w-28 py-3 mt-4 bg-blue-700 text-white rounded-lg hover:bg-blue-400 transition duration-300 ease-in-out'>
            Add
        </button>



    </form>
  )
}

export default AddJob
