/* Curso rápido de Git y GitHub — contenido (window.CURSO).
   Mismo motor que /cursodeia (curso.js + curso.css). store:"cursogit" => progreso independiente. */
window.CURSO = {
  title: "Git y GitHub rápido",
  brand: "Git",
  store: "cursogit",
  subtitle: "Entendé de una vez qué hacen Git y GitHub cuando programás con IA. De cero, sin vueltas y en criollo. Un curso corto para dejarles de tener miedo.",

  glossary: [
    { term: "Repositorio (repo)", def: "Un repositorio, o repo, es la carpeta de tu proyecto pero con superpoderes: además de tus archivos, guarda toda la historia de cambios en una subcarpeta oculta llamada .git. Cuando 'inicializás un repo' con git init, convertís una carpeta común en un proyecto que Git puede seguir.", aliases: ["repositorio", "repositorios", "repo", "repos"] },
    { term: "Commit", def: "Un commit es una foto sellada de tu proyecto en un momento dado, con un mensaje que explica qué cambió y por qué. Es la unidad básica de la historia en Git: cada commit queda guardado para siempre y podés volver a él cuando quieras.", aliases: ["commit", "commits", "commitear", "comitear"] },
    { term: "Mensaje de commit", def: "Es la frase corta que acompaña a cada commit describiendo qué cambió, por ejemplo 'Agrego pantalla de login'. Un buen mensaje de commit es en presente, breve y explica el porqué, no el cómo; es lo que te salva cuando revisás la historia meses después.", aliases: ["mensaje de commit", "mensajes de commit"] },
    { term: "Working directory (directorio de trabajo)", def: "Es tu carpeta de proyecto tal cual la ves en el explorador de archivos: los archivos con los que estás trabajando ahora mismo. Los cambios que hacés ahí todavía no están guardados en la historia de Git hasta que los agregás al staging y hacés commit.", aliases: ["working directory", "directorio de trabajo", "área de trabajo"] },
    { term: "Staging area (área de preparación)", def: "El staging area, también llamado 'index', es una caja intermedia donde ponés los cambios que querés incluir en el próximo commit. Con git add movés cambios a esa caja; con git commit sellás lo que hay adentro. Sirve para armar commits prolijos eligiendo qué entra y qué no.", aliases: ["staging", "staging area", "área de preparación", "el index"] },
    { term: "git add", def: "Es el comando que mueve tus cambios del directorio de trabajo al staging area, o sea, los prepara para el próximo commit. 'git add .' agrega todo lo que cambió; también podés agregar un archivo específico.", aliases: ["git add"] },
    { term: "git status", def: "Es tu brújula en Git: muestra en qué rama estás, qué archivos cambiaron, qué está preparado para el commit y qué no. Ante la duda, siempre corré git status: te dice exactamente en qué estado está tu proyecto.", aliases: ["git status"] },
    { term: "Branch (rama)", def: "Una rama es una línea de trabajo paralela: una copia de tu proyecto donde podés hacer cambios sin tocar la versión que funciona. Sirve para experimentar tranquilo; si sale bien, la unís (merge) a la rama principal, y si sale mal, la descartás.", aliases: ["rama", "ramas", "branch", "branches"] },
    { term: "main", def: "Es el nombre habitual de la rama principal de un repo: la versión oficial y estable de tu proyecto. En repos viejos podés verla como 'master'. La idea es que main siempre funcione, y que los cambios nuevos se prueben primero en otras ramas.", aliases: ["main", "master", "rama principal"] },
    { term: "Merge (unir)", def: "Hacer merge es combinar el trabajo de una rama dentro de otra, por ejemplo traer los cambios de tu rama de prueba a main. Git intenta juntar todo automáticamente; si dos personas tocaron lo mismo, aparece un conflicto de merge que hay que resolver a mano.", aliases: ["merge", "mergear", "unir la rama"] },
    { term: "Conflicto de merge", def: "Un conflicto ocurre cuando dos cambios modifican la misma línea de un archivo y Git no sabe cuál dejar. Marca la zona en disputa con <<<<<<<, ======= y >>>>>>> y te pide que elijas: te quedás con una versión, con la otra, o con una mezcla, y después guardás.", aliases: ["conflicto de merge", "conflicto", "conflictos"] },
    { term: "Remote (remoto)", def: "Un remote es una copia de tu repositorio que vive en otro lado, típicamente en la nube de GitHub. Tu repo local (tu compu) y el remoto se sincronizan con push y pull. Es lo que te permite tener respaldo y trabajar en equipo.", aliases: ["remote", "remoto", "repositorio remoto"] },
    { term: "origin", def: "origin es el nombre por defecto que Git le pone al remote principal, es decir, a la copia de tu repo en GitHub. Cuando hacés 'git push origin main', le estás diciendo: subí mi rama main a la copia que está en la nube.", aliases: ["origin"] },
    { term: "Clone (clonar)", def: "Clonar es bajar una copia completa de un repositorio remoto a tu computadora, con toda su historia incluida. Es lo primero que hacés cuando querés trabajar sobre un proyecto que ya existe en GitHub: git clone y la dirección del repo.", aliases: ["clonar", "clone", "clonás", "clonado"] },
    { term: "Push", def: "Hacer push es subir tus commits locales al remoto (GitHub), para respaldarlos y compartirlos. Hasta que no hacés push, tus cambios viven solo en tu compu. Es el paso de 'publicar' lo que ya sellaste con commit.", aliases: ["push", "pushear", "pusheás", "subir los cambios"] },
    { term: "Pull", def: "Hacer pull es traer a tu compu los cambios nuevos que hay en el remoto y combinarlos con tu trabajo. Conviene hacer pull antes de empezar a trabajar, así arrancás desde la última versión y evitás conflictos.", aliases: ["pull", "pulear", "traer los cambios"] },
    { term: "Fetch", def: "Fetch descarga del remoto la información de los últimos cambios pero sin combinarlos todavía con tu trabajo: te deja mirar qué hay de nuevo antes de decidir. Es como pull pero en dos pasos, más cauteloso.", aliases: ["fetch"] },
    { term: "HEAD", def: "HEAD es un puntero que marca 'dónde estás parado' ahora mismo en la historia: normalmente, el último commit de la rama en la que trabajás. Cuando cambiás de rama, HEAD se mueve con vos. Es la referencia de 'acá y ahora' dentro del repo.", aliases: ["head"] },
    { term: "Diff", def: "Un diff es la comparación entre dos versiones de tus archivos que muestra exactamente qué cambió: las líneas agregadas suelen ir en verde con un +, y las borradas en rojo con un -. Leer el diff es la forma de revisar qué hiciste vos o qué hizo la IA antes de sellarlo.", aliases: ["diff", "diffs", "git diff"] },
    { term: "Log (historial)", def: "El log es la lista de todos los commits de tu proyecto, del más nuevo al más viejo, cada uno con su autor, fecha y mensaje. Con 'git log' recorrés la historia; con 'git log --oneline' la ves resumida, una línea por commit.", aliases: ["git log", "historial", "el log"] },
    { term: ".gitignore", def: "Es un archivo de texto donde listás lo que Git debe ignorar y nunca guardar: claves secretas, archivos .env, la carpeta node_modules, archivos temporales. Es tu principal defensa para no subir sin querer contraseñas ni basura al repositorio.", aliases: [".gitignore", "gitignore"] },
    { term: "Pull Request (PR)", def: "Un Pull Request es una propuesta de cambios en GitHub: 'hice esto en mi rama, ¿lo revisamos y lo sumamos al proyecto?'. Muestra el diff completo, permite comentar línea por línea y recién se integra a main cuando alguien lo aprueba. Es el corazón del trabajo en equipo.", aliases: ["pull request", "pull requests", "pr", "prs"] },
    { term: "Issue", def: "Un issue es una ficha en GitHub para anotar una tarea, un error a arreglar o una idea, con su título, descripción y discusión. Funciona como la lista de pendientes del proyecto, visible para todo el equipo.", aliases: ["issue", "issues"] },
    { term: "Fork", def: "Hacer un fork es sacar tu propia copia de un repositorio ajeno dentro de tu cuenta de GitHub, para experimentar o proponer mejoras sin tocar el original. Se usa mucho en proyectos de código abierto: forkeás, cambiás y después mandás un Pull Request al proyecto original.", aliases: ["fork", "forkear", "forks"] },
    { term: "README", def: "El README (normalmente README.md) es el archivo que se muestra al abrir un repo en GitHub: explica qué es el proyecto, cómo instalarlo y cómo usarlo. Es la cara de tu proyecto para las personas y también un contexto valioso para la IA que trabaja sobre él.", aliases: ["readme", "readme.md"] },
    { term: "gh (GitHub CLI)", def: "gh es la herramienta oficial de GitHub para la línea de comandos: te permite crear repos, abrir Pull Requests, revisar issues y autenticarte, todo desde la terminal sin abrir el navegador. Es lo que suelen usar los asistentes de IA para operar sobre GitHub por vos.", aliases: ["gh", "github cli", "gh cli"] },
    { term: "Token de acceso (PAT)", def: "Un personal access token es una especie de contraseña larga y descartable que le das a un programa (o a un asistente de IA) para que actúe en tu nombre en GitHub, por ejemplo para hacer push. Conviene que tenga solo los permisos justos y tratarlo como lo que es: una credencial secreta.", aliases: ["token", "tokens", "personal access token", "pat", "token de acceso"] },
    { term: "Clave SSH", def: "Una clave SSH es un par de llaves (una pública que subís a GitHub y una privada que guardás en tu compu) que te autentican sin tener que escribir usuario y contraseña cada vez. Es una alternativa cómoda y segura a los tokens para conectarte con el remoto.", aliases: ["clave ssh", "claves ssh", "ssh", "llave ssh"] },
    { term: "Checkout / switch", def: "Son los comandos para moverte entre ramas o versiones: 'git switch' (el moderno) cambia de rama, y 'git checkout' hace eso y algo más en versiones más viejas de Git. Al cambiar de rama, tu carpeta se transforma para mostrar los archivos de esa rama.", aliases: ["switch", "checkout", "git switch", "git checkout"] },
    { term: "Restore (descartar cambios)", def: "git restore descarta cambios que todavía no guardaste, devolviendo un archivo a como estaba en el último commit. Es el 'deshacer' cuando tocaste algo y te arrepentís, siempre y cuando no hayas hecho commit todavía.", aliases: ["restore", "git restore", "descartar cambios"] },
    { term: "Revert", def: "git revert deshace un commit anterior creando un commit nuevo que aplica el cambio contrario, sin borrar nada de la historia. Es la forma segura de 'volver atrás' un cambio que ya está publicado, porque no reescribe el pasado.", aliases: ["revert", "revertir", "git revert"] },
    { term: "Reset", def: "git reset mueve la rama a un commit anterior y, según cómo lo uses, puede tirar cambios a la basura. En su forma más agresiva (--hard) borra trabajo sin red de contención, así que es una herramienta filosa: potente, pero peligrosa si no sabés bien qué hace.", aliases: ["reset", "git reset"] },
    { term: "Stash", def: "git stash guarda temporalmente tus cambios sin commitearlos y te deja la carpeta limpia, para que puedas hacer otra cosa (cambiar de rama, por ejemplo) y después recuperarlos. Es como poner tu trabajo a medio hacer en un cajón por un rato.", aliases: ["stash", "git stash"] },
    { term: "Tag (etiqueta)", def: "Un tag es un cartel que le pegás a un commit importante, típicamente para marcar una versión publicada como v1.0. A diferencia de las ramas, un tag no se mueve: siempre apunta a ese momento exacto de la historia.", aliases: ["tag", "tags"] },
    { term: "Rebase", def: "Rebase es una forma alternativa de integrar cambios que reescribe la historia para dejarla más lineal y prolija, en vez de crear un commit de merge. Es potente pero delicado; como principiante te alcanza con merge, y conviene no rebasar ramas que ya compartiste.", aliases: ["rebase", "rebasear"] },
    { term: "GitHub Actions (CI)", def: "GitHub Actions es el sistema de automatización de GitHub: corre tareas solas cada vez que hacés push, por ejemplo probar el código o desplegar tu app. A esa idea de verificar y publicar automáticamente cada cambio se la llama integración continua, o CI.", aliases: ["github actions", "actions", "integración continua", "ci"] },
    { term: "Markdown", def: "Markdown es una forma simple de dar formato a texto usando signos comunes: # para títulos, ** para negrita, guiones para listas. GitHub lo usa en los README, los issues y los comentarios, y se convierte solo en texto lindo y formateado.", aliases: ["markdown", "md"] }
  ],

  modules: [
    {
      id: "m1", num: 1, icon: "🧭",
      title: "¿Por qué existe Git?",
      summary: "El problema que Git resuelve, en qué se diferencia de GitHub, y por qué te conviene entenderlo aunque programes con IA.",
      lessons: [
        {
          id: "m1l1", title: "El drama del 'proyecto_final_v3_ahora_si'", minutes: 5,
          html: `<p>Seguro alguna vez tuviste una carpeta así: <code>proyecto.zip</code>, <code>proyecto_final.zip</code>, <code>proyecto_final_v2.zip</code>, <code>proyecto_final_ahora_si_este.zip</code>. Nadie sabe cuál es el bueno, y si algo se rompió ayer, no hay forma de volver atrás sin perder trabajo. Ese caos es <strong>exactamente</strong> el problema que Git vino a resolver.</p>
<p>Git es un <strong>sistema de control de versiones</strong>: un programa que lleva la historia completa de tu proyecto. En vez de guardar copias con nombres cada vez más largos, sacás "fotos" de tu proyecto en momentos clave (cada foto se llama <strong>commit</strong>) y Git guarda todas esas fotos ordenadas en el tiempo.</p>
<h3>Qué te da tener esa historia</h3>
<ul>
<li><strong>Una máquina del tiempo:</strong> si algo se rompe, volvés a cualquier foto anterior donde funcionaba.</li>
<li><strong>Un diario del proyecto:</strong> cada cambio queda anotado con quién, cuándo y por qué.</li>
<li><strong>Tranquilidad para experimentar:</strong> probás algo arriesgado sabiendo que siempre podés volver.</li>
</ul>
<div class="note note--example"><p>Pensalo como el historial de ediciones de un documento compartido, pero mucho más potente y bajo tu control: no solo ves quién cambió qué, sino que podés viajar a cualquier versión anterior del proyecto entero con un comando.</p></div>
<p>La buena noticia: no necesitás memorizar cientos de comandos. Con entender un puñado de ideas y cinco o seis comandos, ya te movés con soltura. Eso es lo que vamos a hacer en este curso, cortito y al pie.</p>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Git es un sistema de control de versiones: guarda la historia completa de tu proyecto.</li>
<li>Cada "foto" del proyecto se llama commit y queda guardada para siempre.</li>
<li>Te da máquina del tiempo, diario de cambios y libertad para experimentar sin miedo.</li>
<li>Con pocas ideas y pocos comandos alcanza para trabajar tranquilo.</li>
</ul></div>`
        },
        {
          id: "m1l2", title: "Git y GitHub NO son lo mismo", minutes: 4,
          html: `<p>Es la confusión número uno, y aclararla ahora te va a ahorrar mucho enredo. Git y GitHub suenan parecido pero son cosas distintas que trabajan juntas.</p>
<h3>Git: el programa en tu compu</h3>
<p>Git es un programa que vive en tu computadora y lleva la historia de tu proyecto <strong>localmente</strong>. Funciona sin internet. Es quien saca las fotos (los commits) y guarda la línea de tiempo.</p>
<h3>GitHub: la nube donde publicás esa historia</h3>
<p>GitHub es un sitio web (una empresa, hoy de Microsoft) donde subís una copia de tu repositorio a la nube. Sirve para tener respaldo, para compartir tu proyecto y para trabajar con otras personas. Hay alternativas parecidas como GitLab o Bitbucket, pero GitHub es la más popular.</p>
<div class="note note--tip"><p>Una analogía que funciona: <strong>Git es tu cámara de fotos</strong> (saca y guarda las imágenes en tu casa); <strong>GitHub es la nube compartida</strong> donde subís el álbum para respaldarlo y que otros lo vean. Podés usar la cámara sin la nube, pero juntas rinden mucho más.</p></div>
<p>En resumen: usás <strong>Git</strong> para trabajar en tu compu, y <strong>GitHub</strong> para guardar y compartir ese trabajo en internet. Todo el curso alterna entre las dos: primero lo local (Git), después la nube (GitHub).</p>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Git es un programa local en tu compu; funciona sin internet.</li>
<li>GitHub es un sitio web donde subís una copia de tu repo a la nube.</li>
<li>Git saca las fotos; GitHub es el álbum compartido en la nube.</li>
<li>GitLab y Bitbucket son alternativas a GitHub, con la misma idea.</li>
</ul></div>`
        },
        {
          id: "m1l3", title: "Por qué esto te importa si programás con IA", minutes: 5,
          html: `<p>Quizás estás acá porque usás herramientas como <strong>Claude Code</strong>, <strong>Cursor</strong> o <strong>Codex</strong> para armar apps, y estas todo el tiempo mencionan "commit", "rama", "push", "PR"... y vos asentís sin entender del todo. Este curso es para eso.</p>
<h3>La IA usa Git sin parar</h3>
<p>Cuando le pedís a un asistente de IA que programe algo, por debajo casi siempre usa Git: crea una rama para su cambio, hace commits a medida que avanza, y muchas veces abre un Pull Request para proponerte el resultado. No es un detalle técnico menor: es el mecanismo con el que la IA guarda y organiza el trabajo que hace por vos.</p>
<h3>Entenderlo es tu red de seguridad</h3>
<p>Si entendés lo básico de Git, pasás de "aceptar a ciegas lo que la IA hizo" a estar realmente al mando:</p>
<ul>
<li>Podés <strong>revisar</strong> exactamente qué cambió antes de aceptarlo (leyendo el diff).</li>
<li>Podés <strong>deshacer</strong> con calma si algo salió mal, sin perder el resto.</li>
<li>Evitás desastres típicos, como <strong>subir tus claves secretas</strong> a un repo público.</li>
<li>Entendés qué te está diciendo la IA cuando habla de ramas y commits.</li>
</ul>
<div class="note note--try"><p><strong>Probá ahora:</strong> abrí la terminal de tu editor (en VS Code es Ver → Terminal) y escribí <code>git status</code>. Si te dice algo sobre una rama o archivos, ya estás dentro de un repo. Si dice "not a git repository", no pasa nada: en el próximo módulo creamos uno desde cero.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Las herramientas de IA para programar usan Git constantemente por debajo.</li>
<li>Crean ramas, hacen commits y abren Pull Requests con tu trabajo.</li>
<li>Entender Git te deja revisar, deshacer y estar al mando, no aceptar a ciegas.</li>
<li>Te evita errores caros como subir secretos a un repositorio público.</li>
</ul></div>`
        }
      ],
      quiz: [
        { q: "¿Qué problema principal resuelve Git?", options: ["Hace que tu código corra más rápido", "Lleva la historia completa de tu proyecto para poder volver atrás y ver qué cambió", "Reemplaza la necesidad de escribir código", "Guarda tus archivos en internet automáticamente"], answer: 1, explain: "Git es un sistema de control de versiones: guarda cada 'foto' (commit) de tu proyecto, así podés volver a versiones anteriores y ver quién cambió qué y cuándo." },
        { q: "¿Cuál es la diferencia entre Git y GitHub?", options: ["Son dos nombres para lo mismo", "Git es la versión gratis y GitHub la versión paga", "Git es el programa local en tu compu; GitHub es el sitio web donde subís una copia a la nube", "Git es para texto y GitHub para imágenes"], answer: 2, explain: "Git corre en tu compu y lleva la historia localmente; GitHub es una plataforma en la nube donde publicás y compartís ese repositorio. Git es la cámara, GitHub es el álbum compartido." },
        { q: "Cuando le pedís a un asistente de IA (como Claude Code o Cursor) que programe algo, ¿qué suele hacer con Git por debajo?", options: ["Nada, la IA no usa Git", "Crea ramas, hace commits y a veces abre Pull Requests con su trabajo", "Borra tu historial anterior", "Convierte tu proyecto en un archivo .zip"], answer: 1, explain: "Las herramientas de IA usan Git para organizar lo que hacen: crean una rama, van commiteando y muchas veces abren un PR para que vos revises y apruebes." },
        { q: "¿Por qué conviene entender Git aunque la IA lo maneje por vos?", options: ["Porque así podés revisar los cambios, deshacer con calma y evitar subir secretos", "Porque sin saber Git la IA no funciona", "Porque Git es obligatorio para usar internet", "No conviene: es una pérdida de tiempo"], answer: 0, explain: "Entender lo básico te vuelve el que está al mando: revisás el diff antes de aceptar, deshacés si algo sale mal y evitás desastres como publicar claves secretas." }
      ]
    },

    {
      id: "m2", num: 2, icon: "🧰",
      title: "Manos a la obra: tu primer repo",
      summary: "Configurás Git en dos minutos y entendés el modelo mental clave: los tres lugares donde vive tu código y el loop diario.",
      lessons: [
        {
          id: "m2l1", title: "¿Ya tenés Git? Configurarlo en 2 minutos", minutes: 5,
          html: `<p>Antes de crear nada, chequeemos que Git esté instalado y presentate ante él. En la terminal, escribí:</p>
<pre class="cmd">$ git --version</pre>
<p>Si te responde algo como <code>git version 2.42.0</code>, ya lo tenés (viene instalado en muchas Mac y Linux). Si dice "command not found", instalalo desde <code>git-scm.com</code> o dejá que tu editor te ofrezca instalarlo.</p>
<h3>Presentarte: nombre y email</h3>
<p>Cada commit lleva firma: quién lo hizo. Configurá tu nombre y email una sola vez y queda para siempre:</p>
<pre class="cmd">$ git config --global user.name "Tu Nombre"
$ git config --global user.email "vos@ejemplo.com"</pre>
<p>El <code>--global</code> significa "para todos mis proyectos en esta compu". Con esto, cada foto que saques va a quedar firmada por vos.</p>
<div class="note note--warn"><p><strong>Ojo con el email:</strong> en repos públicos, el email que pongas acá queda visible en la historia para cualquiera. Si te importa la privacidad, GitHub te ofrece un email de tipo <code>...@users.noreply.github.com</code> para usar en su lugar. Lo vemos más adelante; por ahora, usá uno que no te moleste que se vea.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>git --version te dice si Git está instalado y qué versión tenés.</li>
<li>Configurás tu nombre y email una vez con git config --global.</li>
<li>Esos datos firman cada commit que hagas.</li>
<li>En repos públicos el email queda visible: elegí uno acorde.</li>
</ul></div>`
        },
        {
          id: "m2l2", title: "Qué es un repositorio (y cómo se crea)", minutes: 4,
          html: `<p>Un <strong>repositorio</strong> es tu carpeta de proyecto con superpoderes. Por fuera parece una carpeta normal; por dentro tiene una subcarpeta oculta llamada <code>.git</code> donde Git guarda toda la historia. Convertir una carpeta común en repo se llama "inicializar".</p>
<h3>Opción A: empezar de cero</h3>
<p>Entrás a la carpeta de tu proyecto y corrés:</p>
<pre class="cmd">$ git init</pre>
<p>Listo: esa carpeta ya es un repositorio y Git empieza a seguir sus cambios. Muchas veces, cuando armás una app con IA, el asistente hace este paso por vos sin que lo notes.</p>
<h3>Opción B: traer uno que ya existe</h3>
<p>Si el proyecto ya está en GitHub, en vez de crearlo lo <strong>clonás</strong> (lo vemos en detalle en el módulo 5):</p>
<pre class="cmd">$ git clone https://github.com/usuario/proyecto.git</pre>
<div class="note note--info"><p>La carpeta <code>.git</code> es el cerebro del repo: ahí vive toda la historia. Está oculta a propósito y <strong>no la toques a mano</strong>. Si algún día borrás esa carpeta, el proyecto sigue estando pero pierde toda su memoria de versiones.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Un repositorio es una carpeta con una subcarpeta oculta .git que guarda la historia.</li>
<li>git init convierte una carpeta común en repositorio.</li>
<li>git clone baja un repo que ya existe en la nube.</li>
<li>No toques ni borres la carpeta .git: es la memoria del proyecto.</li>
</ul></div>`
        },
        {
          id: "m2l3", title: "Los tres lugares: el modelo mental clave", minutes: 6,
          html: `<p>Si entendés esta sola idea, Git deja de ser un misterio. Tus archivos, en Git, pueden estar en <strong>tres lugares</strong> distintos, y casi todos los comandos son moverlos de uno a otro.</p>
<h3>1. El directorio de trabajo</h3>
<p>Es tu carpeta tal cual la ves: los archivos con los que estás trabajando ahora. Acá hacés los cambios, pero todavía no están guardados en la historia.</p>
<h3>2. El staging area (la caja del próximo commit)</h3>
<p>Es una caja intermedia donde ponés los cambios que querés incluir en la próxima foto. Sirve para elegir con cuidado qué entra en cada commit y qué no. Ponés cosas en la caja con <code>git add</code>.</p>
<h3>3. El repositorio (la historia sellada)</h3>
<p>Cuando hacés <code>git commit</code>, sellás lo que hay en la caja y se convierte en una foto permanente dentro de la historia.</p>
<div class="note note--example"><p>Pensalo como mandar una carta: <strong>escribís</strong> la carta (directorio de trabajo) → la <strong>metés en el sobre</strong> (staging, con git add) → la <strong>despachás</strong> y ya no se puede modificar (commit). El sobre te deja elegir qué papeles mandás y cuáles dejás para otra carta.</p></div>
<details class="adv"><summary>⚡ Para ir más lejos <span class="adv-badge">opcional · técnico</span></summary>
<p>Hay una cuarta pieza que conviene conocer: <strong>HEAD</strong>. Es un puntero que indica "dónde estás parado" en la historia, normalmente el último commit de tu rama actual. Cuando cambiás de rama, HEAD se mueve. Muchos comandos, como <code>git diff HEAD</code>, se apoyan en esa referencia de "acá y ahora".</p>
<p>Y el staging area también se llama <strong>index</strong> en la documentación de Git; son dos nombres para la misma caja.</p>
</details>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Tus archivos pueden estar en tres lugares: directorio de trabajo, staging area y repositorio.</li>
<li>git add mueve cambios del directorio de trabajo al staging.</li>
<li>git commit sella lo que hay en el staging como una foto permanente.</li>
<li>Es como escribir una carta, meterla en el sobre y despacharla.</li>
</ul></div>`
        },
        {
          id: "m2l4", title: "El loop diario: status, add, commit", minutes: 6,
          html: `<p>Con el modelo de los tres lugares en la cabeza, el trabajo del día a día se reduce a un pequeño baile de tres pasos que vas a repetir mil veces.</p>
<h3>El ciclo</h3>
<pre class="cmd">$ git status                 # ¿qué cambió? tu brújula
$ git add archivo.js         # poné cambios en la caja
$ git add .                  # ...o poné TODO lo que cambió
$ git commit -m "Agrego el botón de login"   # sellá la foto</pre>
<p>Empezá <strong>siempre</strong> por <code>git status</code>: te dice en qué rama estás, qué archivos cambiaron y qué está preparado para el commit. Es la pregunta "¿dónde estoy parado?" y nunca está de más hacerla.</p>
<p>Después, <code>git add</code> elige qué entra en la foto, y <code>git commit -m</code> la saca con un mensaje que explica el cambio. Un commit = un cambio con sentido + su mensaje.</p>
<div class="note note--tip"><p><strong>Buenos mensajes de commit:</strong> escribilos en presente y explicá el <em>qué</em>, no el <em>cómo</em>. "Arreglo el error al guardar el formulario" es útil; "cambios varios" o "asdf" te van a hacer llorar cuando busques algo dentro de seis meses. Commits chiquitos y frecuentes valen más que uno gigante con todo mezclado.</p></div>
<div class="note note--try"><p><strong>Probá:</strong> en un repo, creá un archivo de texto cualquiera, y corré los tres comandos en orden: <code>git status</code>, <code>git add .</code>, <code>git commit -m "Mi primer commit"</code>. Después corré <code>git status</code> de nuevo y mirá cómo cambió el mensaje. ¡Acabás de sacar tu primera foto!</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>El trabajo diario es un ciclo: status → add → commit.</li>
<li>Arrancá siempre con git status: es tu brújula.</li>
<li>git add elige qué entra al commit; git commit -m lo sella con un mensaje.</li>
<li>Escribí mensajes claros y hacé commits chicos y frecuentes.</li>
</ul></div>`
        }
      ],
      quiz: [
        { q: "¿Qué hace exactamente 'git add'?", options: ["Sube tus cambios a GitHub", "Mueve cambios del directorio de trabajo al staging area (la caja del próximo commit)", "Crea un repositorio nuevo", "Borra los cambios que hiciste"], answer: 1, explain: "git add prepara cambios para el próximo commit moviéndolos al staging area. Todavía no los sella (eso es commit) ni los sube a la nube (eso es push)." },
        { q: "En la analogía de mandar una carta, ¿qué representa 'git commit'?", options: ["Escribir la carta", "Meter la carta en el sobre", "Despachar la carta: queda sellada y ya no se modifica", "Comprar la estampilla"], answer: 2, explain: "Escribir es el directorio de trabajo, meter en el sobre es git add (staging), y despachar es git commit: sella una foto permanente en la historia." },
        { q: "¿Con cuál comando conviene empezar siempre, para saber en qué estado está tu proyecto?", options: ["git commit", "git push", "git status", "git delete"], answer: 2, explain: "git status es tu brújula: te dice en qué rama estás, qué archivos cambiaron y qué está preparado. Ante la duda, siempre git status." },
        { q: "¿Cuál de estos es un buen mensaje de commit?", options: ["asdf", "cambios varios", "Arreglo el error al guardar el formulario de contacto", "commit"], answer: 2, explain: "Un buen mensaje explica el qué en presente y de forma específica, así te ubicás rápido al revisar la historia. Los mensajes vagos como 'cambios varios' no ayudan a nadie." }
      ]
    },

    {
      id: "m3", num: 3, icon: "📜",
      title: "Historia, deshacer y no romper nada",
      summary: "Ver el pasado, leer un diff como un profesional, deshacer con calma sin dramas y evitar el pecado capital: subir tus secretos.",
      lessons: [
        {
          id: "m3l1", title: "Ver la historia y leer un diff", minutes: 6,
          html: `<p>Ya sabés sacar fotos. Ahora vamos a mirar el álbum y, sobre todo, a leer <strong>qué cambió</strong> entre una foto y otra. Esta última habilidad es la más importante de todo el curso para trabajar con IA.</p>
<h3>Ver la historia: git log</h3>
<pre class="cmd">$ git log              # historia completa, detallada
$ git log --oneline    # una línea por commit, resumida</pre>
<p>El log te muestra los commits del más nuevo al más viejo, con su autor, fecha y mensaje. Con <code>--oneline</code> lo ves compacto, ideal para recorrer rápido.</p>
<h3>Leer un diff: la habilidad estrella</h3>
<p>Un <strong>diff</strong> muestra las líneas que cambiaron. Las agregadas van con <code>+</code> (verde) y las borradas con <code>-</code> (rojo):</p>
<pre class="sample">  function saludar(nombre) {
-   return "Hola";
+   return "Hola " + nombre;
  }</pre>
<p>Corré <code>git diff</code> para ver los cambios que todavía no agregaste a la caja. Leer un diff es leer, en concreto, qué se modificó: es tu punto de control para revisar lo que hiciste vos o lo que hizo la IA <strong>antes</strong> de sellarlo con un commit.</p>
<div class="note note--tip"><p>No hace falta hacer esto siempre desde la terminal. Editores como VS Code, y la propia web de GitHub, te muestran los diffs con colores lado a lado, mucho más cómodos de leer. Pero la idea es la misma: verde suma, rojo resta.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>git log muestra la historia de commits; --oneline la resume.</li>
<li>Un diff muestra qué líneas cambiaron: + verde agrega, - rojo borra.</li>
<li>git diff te muestra los cambios pendientes antes de commitear.</li>
<li>Leer diffs es tu punto de control para revisar el trabajo, tuyo o de la IA.</li>
</ul></div>`
        },
        {
          id: "m3l2", title: "Deshacer sin pánico", minutes: 6,
          html: `<p>Uno de los mayores miedos al empezar con Git es "romper algo sin querer". La verdad es que, bien usado, Git es lo que te <strong>salva</strong> de romper cosas. Estas son las formas seguras de volver atrás.</p>
<h3>Descartar cambios que todavía no guardaste</h3>
<p>Tocaste un archivo, no te gustó, y querés volverlo a como estaba en el último commit:</p>
<pre class="cmd">$ git restore archivo.js     # descarta cambios NO commiteados</pre>
<h3>Deshacer un commit ya hecho, de forma segura</h3>
<p>Si un commit anterior metió la pata, <code>git revert</code> crea un commit nuevo que aplica el cambio contrario. No borra nada: la historia queda intacta y por eso es la opción segura, incluso si ya publicaste.</p>
<pre class="cmd">$ git revert &lt;id-del-commit&gt;</pre>
<div class="note note--warn"><p><strong>Cuidado con <code>git reset --hard</code>.</strong> Es el comando que sí puede borrar trabajo sin red de contención: mueve la rama atrás y tira a la basura los cambios. Tiene usos legítimos, pero como principiante evitalo, y jamás lo corras si no entendés qué va a pasar. Cuando quieras "volver atrás", pensá primero en <code>restore</code> (cambios sin guardar) o <code>revert</code> (commits ya hechos).</p></div>
<details class="adv"><summary>⚡ Para ir más lejos <span class="adv-badge">opcional · técnico</span></summary>
<p>La diferencia clave: <strong>revert</strong> suma un commit nuevo que deshace lo anterior, así que no reescribe la historia y es seguro para ramas compartidas. <strong>reset</strong> mueve la rama a un commit anterior y, con <code>--hard</code>, descarta lo que había en el medio. Regla práctica: si el commit ya lo compartiste (hiciste push), usá revert; reset es solo para arreglos locales que nadie más vio todavía.</p>
</details>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>git restore descarta cambios que todavía no commiteaste.</li>
<li>git revert deshace un commit creando otro que lo compensa: es seguro.</li>
<li>git reset --hard puede borrar trabajo: evitalo como principiante.</li>
<li>Para volver atrás, pensá primero en restore o revert.</li>
</ul></div>`
        },
        {
          id: "m3l3", title: ".gitignore y el pecado capital: subir tus secretos", minutes: 6,
          html: `<p>Este es, sin exagerar, el error más peligroso que vas a querer evitar toda tu vida como persona que crea apps: <strong>subir tus claves secretas a un repositorio</strong>. Y es facilísimo que pase si no tomás una precaución.</p>
<h3>Qué NO debe entrar nunca a un repo</h3>
<ul>
<li>Claves de API y contraseñas (por ejemplo, tu clave de OpenAI o de un servicio de pago).</li>
<li>Archivos de configuración con secretos, típicamente el archivo <code>.env</code>.</li>
<li>Carpetas pesadas y regenerables como <code>node_modules</code>.</li>
</ul>
<h3>Tu escudo: el archivo .gitignore</h3>
<p>Creás un archivo llamado <code>.gitignore</code> en la raíz del proyecto y listás ahí lo que Git debe ignorar. Todo lo que aparezca en esa lista, Git no lo va a seguir ni a subir:</p>
<pre class="sample"># Secretos y config local
.env
.env.local

# Dependencias que se regeneran solas
node_modules/

# Archivos del sistema y del editor
.DS_Store
.vscode/</pre>
<div class="note note--warn"><p><strong>Si ya subiste una clave, borrarla del código no alcanza:</strong> queda en la historia del repo para siempre y hay que asumirla comprometida. Lo correcto es <strong>rotarla</strong> de inmediato (generar una nueva y desactivar la vieja) en el sitio del servicio. Por eso el <code>.gitignore</code> se pone <em>antes</em> de subir nada.</p></div>
<div class="note note--tip"><p>Cuando armás un proyecto con IA, pedile explícitamente: "creá un .gitignore apropiado y asegurate de que las claves vayan en un .env ignorado". Los asistentes lo hacen bien, pero conviene que vos sepas revisarlo. Es tu responsabilidad final, no la de la herramienta.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Nunca subas claves, contraseñas ni archivos .env a un repositorio.</li>
<li>El archivo .gitignore lista lo que Git debe ignorar y no subir.</li>
<li>Poné el .gitignore antes de subir nada al remoto.</li>
<li>Si ya subiste una clave, rotala: borrarla del código no la saca de la historia.</li>
</ul></div>`
        }
      ],
      quiz: [
        { q: "En un diff, ¿qué significa una línea que empieza con '+' en verde?", options: ["Una línea que se borró", "Una línea que se agregó", "Un error en el código", "Una línea que no cambió"], answer: 1, explain: "En un diff, el + verde marca líneas agregadas y el - rojo marca líneas borradas. Leerlo así te deja ver exactamente qué cambió." },
        { q: "Querés deshacer un commit que ya publicaste, de forma segura. ¿Qué comando conviene?", options: ["git reset --hard, que borra todo rápido", "git revert, que crea un commit nuevo que deshace el anterior sin reescribir la historia", "git delete", "Ninguno, no se puede deshacer un commit"], answer: 1, explain: "git revert es la opción segura: no borra la historia, sino que agrega un commit que aplica el cambio contrario. git reset --hard puede borrar trabajo y es riesgoso, sobre todo si ya compartiste el commit." },
        { q: "¿Para qué sirve el archivo .gitignore?", options: ["Para acelerar Git", "Para listar archivos que Git debe ignorar y nunca subir, como .env o node_modules", "Para guardar tus contraseñas de forma segura", "Para borrar el repositorio"], answer: 1, explain: "El .gitignore le dice a Git qué no seguir ni subir. Es tu principal defensa para no publicar por error secretos, archivos .env o carpetas pesadas como node_modules." },
        { q: "Descubrís que subiste sin querer una clave de API a un repo público. ¿Qué es lo correcto?", options: ["Borrarla del código y listo", "Rotarla de inmediato: generar una nueva y desactivar la vieja, porque queda en la historia", "No hacer nada, nadie la va a ver", "Borrar todo el repositorio y empezar de cero siempre"], answer: 1, explain: "Borrarla del código no alcanza: la clave queda en la historia del repo. Hay que asumirla comprometida y rotarla ya mismo en el servicio, generando una nueva y desactivando la anterior." }
      ]
    },

    {
      id: "m4", num: 4, icon: "🌿",
      title: "Ramas: trabajar sin miedo",
      summary: "Qué es una rama, por qué la IA crea ramas para cada cambio, y cómo unir el trabajo (incluidos los conflictos) sin llorar.",
      lessons: [
        {
          id: "m4l1", title: "Qué es una rama (y por qué la IA crea ramas)", minutes: 5,
          html: `<p>Una <strong>rama</strong> es una línea de trabajo paralela: una copia de tu proyecto donde podés hacer cambios sin tocar la versión que funciona. Es, quizás, la idea más poderosa de Git.</p>
<h3>La rama principal: main</h3>
<p>Todo repo tiene una rama principal, casi siempre llamada <code>main</code> (en repos viejos, <code>master</code>). La idea es que <code>main</code> sea la versión oficial y estable, la que "siempre funciona".</p>
<h3>Ramas para experimentar tranquilo</h3>
<p>Cuando querés agregar algo nuevo o arriesgado, en vez de tocar main directamente, creás una rama aparte. Ahí probás con total libertad. Si sale bien, la unís a main; si sale mal, la descartás y main ni se enteró.</p>
<div class="note note--example"><p>Imaginá que main es la película oficial. Una rama es un <strong>universo paralelo</strong> donde probás un final distinto sin arruinar el original. Si el final nuevo te gusta, lo traés a la película oficial; si no, cerrás ese universo y no pasó nada.</p></div>
<h3>Por qué la IA crea ramas</h3>
<p>Cuando un asistente de IA hace un cambio grande, suele crear una rama nueva para su trabajo. Así, <code>main</code> queda intacto mientras vos revisás lo que propuso. Es una red de seguridad: podés mirar todo con calma y recién integrarlo cuando estés conforme.</p>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Una rama es una línea paralela para cambiar cosas sin tocar lo que funciona.</li>
<li>main es la rama principal, la versión oficial y estable.</li>
<li>Experimentás en una rama y, si sale bien, la unís a main.</li>
<li>La IA crea ramas para su trabajo, así main queda intacto mientras revisás.</li>
</ul></div>`
        },
        {
          id: "m4l2", title: "Crear, cambiar y unir (merge)", minutes: 6,
          html: `<p>Trabajar con ramas son tres gestos: crear una, moverte entre ellas, y unir el trabajo de vuelta a main. Los comandos modernos son cortitos.</p>
<h3>Crear una rama y saltar a ella</h3>
<pre class="cmd">$ git switch -c nueva-funcion    # crea la rama y te para en ella
$ git switch main                # volver a main
$ git switch nueva-funcion       # volver a tu rama</pre>
<p>El <code>-c</code> es de "create". Sin él, <code>git switch</code> simplemente te mueve a una rama que ya existe. Al cambiar de rama, tu carpeta se transforma para mostrarte los archivos de esa rama.</p>
<h3>Unir el trabajo: merge</h3>
<p>Cuando tu rama está lista, te parás en la rama que va a recibir los cambios (normalmente <code>main</code>) y hacés merge de la otra:</p>
<pre class="cmd">$ git switch main
$ git merge nueva-funcion        # trae los cambios a main</pre>
<div class="note note--tip"><p>Regla de oro: <strong>una rama por cada cosa</strong>. Si vas a arreglar un error y además agregar una función, hacé dos ramas. Así cada cambio se revisa y se integra por separado, y si uno falla no arrastra al otro. Es exactamente lo que hacen los equipos profesionales... y las buenas herramientas de IA.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>git switch -c crea una rama nueva y te lleva a ella.</li>
<li>git switch (sin -c) te mueve entre ramas que ya existen.</li>
<li>git merge trae los cambios de una rama a la rama donde estás parado.</li>
<li>Usá una rama por cada cambio distinto.</li>
</ul></div>`
        },
        {
          id: "m4l3", title: "Conflictos de merge sin llorar", minutes: 6,
          html: `<p>La palabra "conflicto" asusta, pero es de lo más común y se resuelve con calma. Un <strong>conflicto de merge</strong> aparece cuando dos cambios tocaron <em>la misma línea</em> del mismo archivo y Git no sabe con cuál quedarse. Entonces te pregunta a vos.</p>
<h3>Cómo se ve un conflicto</h3>
<p>Git marca la zona en disputa dentro del archivo con estos carteles:</p>
<pre class="sample">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
color = "azul";
=======
color = "verde";
&gt;&gt;&gt;&gt;&gt;&gt;&gt; nueva-funcion</pre>
<p>Arriba (entre <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> y <code>=======</code>) está tu versión actual; abajo (hasta <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>) la que venís a integrar. Resolver es simple: <strong>editás el archivo</strong> para dejarlo como debe quedar, borrás los tres carteles, y guardás.</p>
<h3>Después de elegir</h3>
<pre class="cmd">$ git add archivo-resuelto.js
$ git commit                     # confirma el merge resuelto</pre>
<div class="note note--warn"><p>El error clásico es dejar algún cartel (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> o <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>) olvidado dentro del archivo. Revisá que no quede ninguno antes de guardar, o tu código va a romperse. Editores como VS Code te ofrecen botones tipo "aceptar cambio actual / entrante" que hacen esto más cómodo.</p></div>
<div class="note note--tip"><p>Cuando programás con IA, muchas veces el asistente resuelve los conflictos por vos. Pero ahora entendés qué está pasando y podés revisar que la resolución sea la correcta, en vez de aceptar a ciegas.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Un conflicto pasa cuando dos cambios tocan la misma línea y Git no elige solo.</li>
<li>Git marca la zona con &lt;&lt;&lt;&lt;&lt;&lt;&lt;, ======= y &gt;&gt;&gt;&gt;&gt;&gt;&gt;.</li>
<li>Editás el archivo como debe quedar, borrás los carteles y guardás.</li>
<li>Después: git add del archivo resuelto y git commit para cerrar el merge.</li>
</ul></div>`
        }
      ],
      quiz: [
        { q: "¿Qué es una rama (branch) en Git?", options: ["Un respaldo automático en la nube", "Una línea de trabajo paralela donde cambiás cosas sin tocar la versión que funciona", "Un tipo de commit especial", "El nombre de tu repositorio"], answer: 1, explain: "Una rama es una copia paralela del proyecto para experimentar sin afectar main. Si sale bien, la unís (merge); si sale mal, la descartás sin consecuencias." },
        { q: "¿Por qué un asistente de IA suele crear una rama nueva para su trabajo?", options: ["Porque es obligatorio en GitHub", "Para que main quede intacto mientras vos revisás lo que propuso", "Para que el código corra más rápido", "Para borrar tu trabajo anterior"], answer: 1, explain: "Al trabajar en una rama aparte, la IA deja main estable y te da una red de seguridad: revisás su propuesta con calma y recién la integrás cuando estás conforme." },
        { q: "¿Cuándo aparece un conflicto de merge?", options: ["Siempre que hacés un merge", "Cuando dos cambios modifican la misma línea del mismo archivo y Git no sabe cuál dejar", "Cuando te quedás sin internet", "Cuando el repositorio es muy grande"], answer: 1, explain: "El conflicto surge solo cuando dos cambios tocan la misma línea y Git no puede combinarlos automáticamente. Ahí te pide a vos que elijas." },
        { q: "Estás resolviendo un conflicto. ¿Qué tenés que hacer con los carteles <<<<<<<, ======= y >>>>>>>?", options: ["Dejarlos, son parte del código", "Editar el archivo para que quede como debe y borrar esos tres carteles antes de guardar", "Solo borrar el del medio", "Copiarlos a otro archivo"], answer: 1, explain: "Esos marcadores delimitan las dos versiones en disputa. Resolver es dejar el archivo como corresponde y borrar los tres carteles; si te olvidás alguno, el código se rompe." }
      ]
    },

    {
      id: "m5", num: 5, icon: "🐙",
      title: "GitHub: tu repo en la nube",
      summary: "Subir tu proyecto y traer cambios, escribir un buen README, y resolver lo que a todos les traba: la autenticación.",
      lessons: [
        {
          id: "m5l1", title: "Remote, clone, push y pull", minutes: 6,
          html: `<p>Hasta acá todo vivió en tu compu. Ahora conectamos tu repo local con GitHub para tener respaldo y poder compartir. La copia en la nube se llama <strong>remote</strong>, y por defecto Git le pone el nombre <strong>origin</strong>.</p>
<h3>Los cuatro verbos que necesitás</h3>
<ul>
<li><strong>clone:</strong> bajar por primera vez un repo que ya existe en la nube.</li>
<li><strong>push:</strong> subir tus commits locales al remoto.</li>
<li><strong>pull:</strong> traer a tu compu los cambios que hay en el remoto.</li>
<li><strong>fetch:</strong> mirar qué hay de nuevo en el remoto sin combinarlo todavía.</li>
</ul>
<pre class="cmd">$ git clone https://github.com/usuario/proyecto.git   # bajar
$ git push origin main                                # subir mi rama main
$ git pull                                            # traer lo nuevo</pre>
<div class="note note--info"><p>Pensá a <strong>origin</strong> como el Google Drive de tu repo: la copia maestra en la nube. <code>push</code> es "subir mis cambios al Drive" y <code>pull</code> es "bajar los cambios que otros subieron". Costumbre sana: hacé <code>pull</code> antes de empezar a trabajar, así arrancás desde la última versión y evitás conflictos.</p></div>
<p>Hasta que no hacés <code>push</code>, tus commits viven solo en tu compu. El push es el momento de "publicar" lo que ya sellaste.</p>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>El remote es la copia de tu repo en la nube; por defecto se llama origin.</li>
<li>clone baja un repo, push sube tus commits, pull trae los cambios nuevos.</li>
<li>fetch mira lo nuevo del remoto sin combinarlo todavía.</li>
<li>Hacé pull antes de empezar a trabajar para evitar conflictos.</li>
</ul></div>`
        },
        {
          id: "m5l2", title: "El README: la cara de tu proyecto", minutes: 4,
          html: `<p>Cuando alguien (o algo) abre tu repositorio en GitHub, lo primero que ve es el <strong>README</strong>: un archivo llamado <code>README.md</code> que GitHub muestra formateado y bonito en la portada del repo.</p>
<h3>Qué poner adentro</h3>
<p>Un README útil responde tres preguntas: qué es el proyecto, cómo se instala y cómo se usa. Está escrito en <strong>Markdown</strong>, esa forma simple de dar formato con signos: <code>#</code> para títulos, <code>**texto**</code> para negrita, guiones para listas.</p>
<pre class="sample"># Mi App de Tareas

Una app simple para anotar pendientes.

## Cómo instalar
1. Cloná el repo
2. Corré: npm install

## Cómo usar
Abrí index.html en el navegador.</pre>
<div class="note note--tip"><p>Un buen README no es solo para otras personas: cuando trabajás con IA, el asistente <strong>lee el README</strong> para entender de qué va el proyecto. Un README claro hace que la IA te ayude mejor, porque arranca con contexto en vez de adivinar.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>El README (README.md) es lo primero que se ve al abrir un repo en GitHub.</li>
<li>Responde qué es el proyecto, cómo se instala y cómo se usa.</li>
<li>Se escribe en Markdown: # títulos, ** negrita, - listas.</li>
<li>Un buen README también le da contexto a la IA que trabaja en tu proyecto.</li>
</ul></div>`
        },
        {
          id: "m5l3", title: "Autenticación: gh, tokens y por qué se traba", minutes: 6,
          html: `<p>Este es el punto donde más gente se frustra: querés hacer <code>push</code> y GitHub te pide identificarte. Ya no alcanza con usuario y contraseña común; necesitás una credencial más segura. Hay dos caminos.</p>
<h3>Camino fácil: la herramienta gh</h3>
<p><strong>gh</strong> es la herramienta oficial de GitHub para la terminal. Con un solo comando te autentica y deja todo listo:</p>
<pre class="cmd">$ gh auth login</pre>
<p>Te va guiando con preguntas (abrí el navegador, confirmá) y a partir de ahí tus <code>push</code> funcionan sin pedirte nada más. Es la opción recomendada para empezar.</p>
<h3>Los tokens de acceso</h3>
<p>La otra forma es un <strong>personal access token</strong> (PAT): una especie de contraseña larga y descartable que generás en GitHub y que le das a un programa para que actúe en tu nombre. Es también lo que suelen usar los asistentes de IA para poder hacer <code>push</code> por vos.</p>
<div class="note note--warn"><p><strong>Un token es una contraseña.</strong> Tratalo como tal: no lo pegues dentro de tu código, no lo compartas en un chat ni lo subas al repo (¡para eso está el .gitignore!). Dale solo los permisos que necesita y, si sospechás que se filtró, revocalo y generá uno nuevo. Igual que con las claves de API del módulo 3.</p></div>
<details class="adv"><summary>⚡ Para ir más lejos <span class="adv-badge">opcional · técnico</span></summary>
<p>Hay una tercera opción muy usada: las <strong>claves SSH</strong>. Generás un par de llaves (una pública que subís a GitHub y una privada que queda en tu compu) y te autenticás sin escribir credenciales cada vez. La diferencia práctica con los tokens es la dirección del repo: las conexiones por HTTPS (<code>https://github.com/...</code>) suelen usar token, y las SSH (<code>git@github.com:...</code>) usan tu clave SSH. Para empezar, <code>gh auth login</code> te resuelve todo sin que tengas que elegir.</p>
</details>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>GitHub pide una credencial segura para hacer push, no la contraseña común.</li>
<li>gh auth login es la forma más simple de autenticarte desde la terminal.</li>
<li>Un token de acceso (PAT) actúa en tu nombre; la IA los usa para pushear por vos.</li>
<li>Tratá el token como una contraseña: no lo pegues en el código ni lo compartas.</li>
</ul></div>`
        }
      ],
      quiz: [
        { q: "¿Qué hace 'git push'?", options: ["Baja un repositorio de la nube por primera vez", "Sube tus commits locales al remoto (GitHub)", "Borra la rama actual", "Muestra la historia de commits"], answer: 1, explain: "push sube al remoto los commits que sellaste localmente. Hasta que no hacés push, tus cambios viven solo en tu compu." },
        { q: "¿Qué es 'origin' en Git?", options: ["Tu primer commit", "El nombre por defecto del remote principal, o sea la copia de tu repo en la nube", "Un tipo de rama", "El autor del proyecto"], answer: 1, explain: "origin es simplemente el nombre que Git le pone por defecto al remoto principal. 'git push origin main' significa: subí mi rama main a esa copia en la nube." },
        { q: "¿Por qué conviene hacer 'git pull' antes de empezar a trabajar?", options: ["Para borrar tus cambios locales", "Para arrancar desde la última versión y evitar conflictos", "Porque es obligatorio cada mañana", "Para crear una rama nueva"], answer: 1, explain: "pull trae los cambios que otros (o vos desde otra compu) subieron al remoto. Empezar desde la última versión reduce la chance de conflictos después." },
        { q: "¿Cómo hay que tratar un personal access token (PAT)?", options: ["Como información pública, se puede compartir", "Como una contraseña: no pegarlo en el código, no compartirlo y revocarlo si se filtra", "Se puede subir al repo sin problema", "Da lo mismo, no da acceso a nada"], answer: 1, explain: "Un token actúa en tu nombre en GitHub, así que es una credencial secreta. No lo pongas en el código ni lo compartas; si se filtra, revocalo y generá uno nuevo." }
      ]
    },

    {
      id: "m6", num: 6, icon: "🤖",
      title: "Git + IA en la práctica",
      summary: "Lo que viniste a buscar: cómo la IA usa Git por vos, cómo revisás su trabajo como un profesional, y el flujo completo de un cambio de principio a fin.",
      lessons: [
        {
          id: "m6l1", title: "Cómo Claude Code, Cursor y Codex usan Git", minutes: 6,
          html: `<p>Ahora que entendés las piezas, veamos cómo encajan cuando armás apps con IA. Herramientas como <strong>Claude Code</strong>, <strong>Cursor</strong> o <strong>Codex</strong> trabajan sobre tu repositorio usando exactamente los comandos que ya conocés.</p>
<h3>Qué hace la IA por debajo</h3>
<p>Cuando le pedís un cambio, el asistente típicamente:</p>
<ul>
<li><strong>Lee tu repo</strong> (incluido el README) para entender el proyecto.</li>
<li>A veces <strong>crea una rama</strong> para su trabajo, dejando main tranquilo.</li>
<li>Edita archivos y va haciendo <strong>commits</strong> con mensajes descriptivos.</li>
<li>Muchas veces abre un <strong>Pull Request</strong> para que vos revises y apruebes.</li>
</ul>
<div class="note note--example"><p>Es como tener un colaborador muy rápido que sigue las buenas prácticas de Git por su cuenta. Pero, como con cualquier colaborador, <strong>vos seguís siendo quien revisa y aprueba</strong>. La IA propone; vos disponés.</p></div>
<h3>Tu punto de control es siempre el mismo</h3>
<p>No importa qué herramienta uses: tu forma de controlar lo que hizo la IA es <strong>leer el diff</strong>. Ahí ves, línea por línea, qué agregó y qué borró, antes de aceptar nada. Todo lo que aprendiste en el módulo 3 se aplica igual acá.</p>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Las herramientas de IA usan los mismos comandos de Git que ya conocés.</li>
<li>Leen tu repo, crean ramas, hacen commits y abren Pull Requests.</li>
<li>La IA propone; vos revisás y aprobás: seguís al mando.</li>
<li>Tu punto de control siempre es leer el diff.</li>
</ul></div>`
        },
        {
          id: "m6l2", title: "Revisar y commitear el trabajo de la IA", minutes: 6,
          html: `<p>La habilidad más valiosa cuando programás con IA no es escribir código: es <strong>revisar</strong> bien. Un asistente puede hacer mucho en segundos, y aceptar todo a ciegas es la receta perfecta para el desastre.</p>
<h3>El ritual de revisión</h3>
<pre class="cmd">$ git status     # ¿qué archivos tocó la IA?
$ git diff       # ¿qué cambió, exactamente, línea por línea?</pre>
<p>Leé el diff con atención: ¿el cambio hace lo que pediste? ¿Tocó algo que no debía? ¿Hay alguna clave secreta que se coló? Recién cuando estás conforme, sellás:</p>
<pre class="cmd">$ git add .
$ git commit -m "Agrego validación al formulario (revisado)"</pre>
<div class="note note--try"><p><strong>Probá esta técnica:</strong> pedile a la IA que te <em>explique su propio diff</em> antes de aceptarlo. Algo como: "Explicame qué cambia este diff y por qué, en criollo". Si la explicación no cierra con lo que ves, no lo aceptes: preguntá o pedí que lo rehaga. Vos tenés la última palabra.</p></div>
<div class="note note--tip"><p><strong>Commits chicos y frecuentes</strong> son tu mejor amigo con IA. Si cada cambio de la IA queda en su propio commit prolijo, revisarlo es fácil y, si algo sale mal, deshacés ese commit puntual con <code>revert</code> sin perder todo lo demás.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Con IA, la habilidad clave es revisar bien, no escribir código.</li>
<li>El ritual: git status para ver qué tocó, git diff para leer qué cambió.</li>
<li>Pedile a la IA que explique su propio diff antes de aceptarlo.</li>
<li>Commits chicos y frecuentes hacen fácil revisar y deshacer.</li>
</ul></div>`
        },
        {
          id: "m6l3", title: "Pull Requests: proponer y revisar cambios", minutes: 6,
          html: `<p>Un <strong>Pull Request</strong> (PR) es la forma en que GitHub organiza el "propongo estos cambios, ¿los sumamos?". Es el corazón del trabajo en equipo, y también cómo muchas herramientas de IA te entregan su trabajo para que lo apruebes.</p>
<h3>Qué es y por qué es tan útil</h3>
<p>Un PR toma los cambios de una rama y los presenta para su revisión antes de integrarlos a <code>main</code>. Muestra el diff completo, permite comentar línea por línea y deja una discusión registrada. Recién cuando se aprueba, se hace merge a main.</p>
<pre class="cmd">$ gh pr create --title "Agrego login" --body "Suma pantalla de ingreso"
$ gh pr view --web      # abrir el PR en el navegador para revisarlo</pre>
<h3>Revisar un PR</h3>
<p>Revisar un PR es leer su diff con la misma mirada crítica de la lección anterior: ¿hace lo que dice? ¿Está limpio? Si algo no va, se comenta y se pide un ajuste; si está bien, se aprueba y se mergea. Cuando la IA abre un PR por vos, tu trabajo es justamente ese: revisarlo y decidir.</p>
<div class="note note--info"><p>Los PR brillan incluso si trabajás solo: te obligan a mirar tus cambios agrupados y con perspectiva antes de meterlos en main. Es una pausa sana entre "lo hice" y "lo integro", y ahí es donde cazás la mayoría de los errores.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>Un Pull Request propone los cambios de una rama antes de integrarlos a main.</li>
<li>Muestra el diff completo y permite comentar y discutir línea por línea.</li>
<li>gh pr create abre un PR desde la terminal.</li>
<li>Revisar un PR (tuyo o de la IA) es leer su diff con mirada crítica y decidir.</li>
</ul></div>`
        },
        {
          id: "m6l4", title: "El flujo completo, de principio a fin", minutes: 7,
          html: `<p>Juntemos todo el curso en una sola escena: querés agregar una función a tu app y lo hacés con ayuda de IA. Este es el recorrido completo, con cada pieza en su lugar.</p>
<h3>El viaje de un cambio</h3>
<pre class="cmd">$ git switch -c agregar-buscador     # 1. rama nueva para el cambio
# 2. la IA (o vos) edita los archivos...
$ git status                         # 3. ¿qué se tocó?
$ git diff                           # 4. revisás el diff con atención
$ git add .
$ git commit -m "Agrego buscador de productos"   # 5. sellás la foto
$ git push origin agregar-buscador   # 6. subís la rama a GitHub
$ gh pr create                       # 7. abrís un PR para revisar
# 8. revisás, aprobás y hacés merge a main</pre>
<p>Rama → cambio → revisar el diff → commit → push → PR → merge. Ese ciclo, con variantes, es el 90% del trabajo real. Y ahora entendés cada paso, no como magia que hace la IA, sino como decisiones que controlás vos.</p>
<h3>Los Issues como lista de pendientes</h3>
<p>Para organizarte, GitHub tiene los <strong>issues</strong>: fichas donde anotás tareas, errores o ideas. Funcionan como la lista de pendientes del proyecto, y muchas veces cada issue termina resuelto por un PR.</p>
<div class="note note--try"><p><strong>Tu desafío final:</strong> tomá un proyecto (uno que tengas o uno nuevo que armes con IA), y recorré el ciclo completo una vez de punta a punta: creá una rama, hacé un cambio chiquito, revisá el diff, commiteá, pusheá y abrí un PR. Cuando lo hagas una vez con las manos, deja de ser teoría para siempre.</p></div>
<div class="note note--tip"><p><strong>¿A dónde seguir?</strong> Con esto ya te movés con soltura en el 90% de las situaciones. Si querés profundizar, los próximos temas naturales son: <code>rebase</code> para historias más prolijas, <code>stash</code> para guardar trabajo a medias, <code>tags</code> para marcar versiones, y <strong>GitHub Actions</strong> para automatizar pruebas y despliegues. Pero no corras: lo que aprendiste acá es la base sólida sobre la que todo lo demás se apoya.</p></div>
<div class="takeaways"><h4>Puntos clave</h4><ul>
<li>El ciclo completo: rama → cambio → revisar diff → commit → push → PR → merge.</li>
<li>Ese recorrido cubre la enorme mayoría del trabajo real, con o sin IA.</li>
<li>Los issues son la lista de pendientes del proyecto en GitHub.</li>
<li>Para seguir: rebase, stash, tags y GitHub Actions, sin apuro.</li>
</ul></div>`
        }
      ],
      quiz: [
        { q: "Cuando un asistente de IA hace cambios en tu proyecto, ¿cuál es tu principal punto de control?", options: ["Confiar y aceptar todo, la IA no se equivoca", "Leer el diff para ver exactamente qué cambió antes de aceptar", "Borrar el repositorio por las dudas", "Reiniciar la computadora"], answer: 1, explain: "Sin importar la herramienta, tu control es leer el diff: te muestra línea por línea qué agregó y qué borró la IA. La IA propone; vos revisás y decidís." },
        { q: "¿Qué es un Pull Request?", options: ["Un pedido para bajar el repo", "Una propuesta de cambios (de una rama) para revisar antes de integrarlos a main", "Un tipo de commit urgente", "Una copia de seguridad"], answer: 1, explain: "Un PR presenta los cambios de una rama con su diff completo para que se revisen, comenten y recién después se hagan merge a main. Es el centro del trabajo colaborativo." },
        { q: "¿Cuál es el orden correcto del flujo completo de un cambio?", options: ["commit → rama → push → diff → PR", "rama → cambio → revisar diff → commit → push → PR → merge", "push → commit → rama → merge", "PR → merge → rama → commit"], answer: 1, explain: "Primero creás una rama, hacés el cambio, revisás el diff, sellás con commit, subís con push, abrís un PR y finalmente hacés merge a main. Ese ciclo cubre casi todo el trabajo real." },
        { q: "¿Para qué sirven los issues en GitHub?", options: ["Para guardar contraseñas", "Como lista de pendientes del proyecto: tareas, errores e ideas", "Para hacer push más rápido", "Para borrar ramas viejas"], answer: 1, explain: "Los issues son fichas donde anotás tareas, errores o ideas: funcionan como la lista de pendientes del proyecto, y muchas veces cada uno termina resuelto por un PR." }
      ]
    }
  ]
};
