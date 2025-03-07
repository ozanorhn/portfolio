import { Injectable } from '@angular/core';
import { SkillIcon } from '../interface/icons.interface';
import { ProjectInterface } from '../interface/project.interface';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() {}

  projects: ProjectInterface[] = [
    {
      name: 'EL Pollo Loco',
      link_github: 'https://github.com/ozanorhn/El-Pollo-Loco',
      live_link: '',
      languages: ['JavaScript', 'HTML', 'CSS'],
      image: 'assets/img/el-pollo-loce.png',
      description_en:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      description_de:
        'Sprung-, Lauf- und Wurfspiel, das auf einem objektorientierten Ansatz basiert. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen die verrückte Henne zu kämpfen.',
    },
    {
      name: 'Join',
      link_github: 'https://github.com/SilverBlure/Join',
      live_link: '',
      languages: ['JavaScript', 'Firebase', 'HTML', 'CSS'],
      image: 'assets/img/join.png',
      description_en:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      description_de:
        'Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen und organisieren Sie Aufgaben mit Hilfe von Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
    },
    {
      name: 'Pokedex',
      link_github: 'https://github.com/ozanorhn/PokeDex',
      live_link: '',
      languages: ['JavaScript', 'Rest-Api', 'HTML', 'CSS'],
      image: '',
      description_en:
        'A Pokémon database featuring a vast collection of data on every Pokémon there is.',
      description_de:
        'Eine Pokémon-Datenbank mit einer Fülle an Informationen über jedes Pokémon, das es gibt.',
    },
  ];

  icons: SkillIcon[] = [
    {
      path: 'assets/img/skill-set/Angular.svg',
      name: 'Angular',
      alt: 'Angular',
    },
    {
      path: 'assets/img/skill-set/TypeScript.svg',
      name: 'TypeScript',
      alt: 'TypeScript',
    },
    {
      path: 'assets/img/skill-set/Firebase.svg',
      name: 'Firebase',
      alt: 'Firebase',
    },
    { path: 'assets/img/skill-set/git.svg', name: 'Git', alt: 'Git' },
    {
      path: 'assets/img/skill-set/JavaScript.svg',
      name: 'JavaScript',
      alt: 'JavaScript',
    },
    { path: 'assets/img/skill-set/Api.svg', name: 'Rest-Api', alt: 'Rest-Api' },
    {
      path: 'assets/img/skill-set/Frame.svg',
      name: 'Material Design',
      alt: 'Material Design',
    },
    { path: 'assets/img/skill-set/scrum.svg', name: 'Scrum', alt: 'Scrum' },
    { path: 'assets/img/skill-set/html.svg', name: 'HTML', alt: 'HTML' },
    { path: 'assets/img/skill-set/Css.svg', name: 'CSS', alt: 'CSS' },
    {
      path: 'assets/img/skill-set/Growth.svg',
      name: 'Growth mindset',
      alt: 'Growth mindset',
    },
  ];

  
}
