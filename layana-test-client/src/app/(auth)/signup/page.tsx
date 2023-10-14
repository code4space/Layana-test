"use client"
import {  FormEvent, useState } from 'react';
import { Input, InputEmail, PasswordInput } from '@/components/input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from "sweetalert2";
import { baseUrl } from '@/constant/url'

export default function RegisterPage() {
    const router = useRouter()
    const [data, setData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })

    async function handleButton(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log('masuk')
        const { username, firstname, lastname, email, password } = data
        await axios({
            url: baseUrl + `/user/register`,
            method: "POST",
            data: { username, firstname, lastname, email, password }
        }).then(() => {
            router.push('/login')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Register Success',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                title: `ERROR ${error.response.status}`,
                text: error.response.data.message,
            });
        })
    }

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box register'>
                    <h3>KARYAWAN SIGN UP</h3>
                    <form className='input-container' onSubmit={handleButton}>
                        <Input setState={setData} state={data} value={'username'} placeHolder={'Username'} />
                        <div className="dual-input">
                            <Input setState={setData} state={data} value={'firstname'} placeHolder={'First Name'} />
                            <Input setState={setData} state={data} value={'lastname'} placeHolder={'Last Name'} />
                        </div>
                        <InputEmail setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput strength={true} setState={setData} state={data} value={'password'} placeHolder={'Password'} />

                        <button className='basic-button' type='submit'>Sign Up</button>
                        <p className='sign-up'>Already a user ? <b onClick={() => router.push('/login')}>Sign In</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}