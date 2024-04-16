import express, { Application } from "express";

export default function expressWrapper(): Application {
    return express();
}
