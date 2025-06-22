import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('programming');
    const [level, setLevel] = useState('Beginner Level');
    const [salary, setSalary] = useState(0);
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const {backendUrl , companyToken} = useContext(AppContext)

    const onsubmitHandler = async (e) => {
        e.preventDefault()
        try{
            const description = quillRef.current.root.innerHTML;
            const {data} = await axios.post(backendUrl + '/api/company/post-job',{
                title,
                description,
                location,
                salary,
                level,
                category
            },{
                headers:{
                    Authorization: `Bearer ${companyToken}`
                }
            })
            if(data.success){
                toast.success(data.message)
                setTitle('')
                setLocation('')
                setCategory('programming')
                setLevel('Beginner Level')
                setSalary(0)
                quillRef.current.root.innerHTML = ''
            }
            else{
                toast.error(data.message)
            }
        }
        catch(err){
            toast.error(err.message)
        }
    }
    
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
    <form onSubmit={onsubmitHandler} className='container flex flex-col items-start gap-4 p-4 mx-auto'>
        <div className='w-full'>
            <p className='mb-2'>Job Title</p>
            <input type="text" placeholder='Typer Here' onChange={e=>setTitle(e.target.value)} value={title} required className='w-full max-w-lg p-2 px-3 py-2 border-2 border-gray-400 rounded-lg'/>
        </div>
        <div className='w-full max-w-lg'>
            <p className='my-2'>Job Description</p>
            <div ref={editorRef}>
            </div>
        </div>
        <div className='flex flex-col w-full gap-2 sm:flex-row sm:gap-8'>
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
        <button className='py-3 mt-4 text-white transition duration-300 ease-in-out bg-blue-700 rounded-lg w-28 hover:bg-blue-400'>
            Add
        </button>



    </form>
  )
}

export default AddJob
