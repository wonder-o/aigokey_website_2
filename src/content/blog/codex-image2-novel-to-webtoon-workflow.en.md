---
slug: codex-image2-novel-to-webtoon-workflow
lang: en
date: '2026-07-19'
category: Case Study
title: "How I used Codex + gpt-image-2 to turn a long novel into a 72-panel webtoon"
summary: A production case study covering source mapping, character consistency, recoverable image jobs, human QA, and publishable slices across 281 chapters.
readTime: 24
featured: true
notice: The novel Tian Mo Shen Tan was chosen solely because of the editor's personal affection for early-era Chinese web fiction. This is a non-commercial experiment. If you have any copyright concerns, please contact the editor and the article will be removed. Thank you.
tags:
  - Codex
  - gpt-image-2
  - Novel adaptation
  - AI webtoon
  - Workflow
sources:
  - publisher: AigoKey Editorial
    title: The Tian Mo Shen Tan novel-to-webtoon project
    url: https://www.aigokey.com/blog/codex-image2-novel-to-webtoon-workflow/
    publishedAt: '2026-07-19'
visual:
  type: steps
  title: Four control points in the novel-to-webtoon pipeline
  items:
    - Ingest the novel: preserve the source, normalize encoding, and build an index
    - Map the adaptation: define story beats before binding every shot to its source
    - Produce visuals: stabilize continuity with a visual bible, references, and scene state
    - Ship safely: use human QA, local revisions, resumable jobs, and platform slices
---

![Cover of the first AI webtoon unit for Tian Mo Shen Tan](/assets/blog/codex-image2-webtoon/cover.jpg)

Many first attempts at AI comics follow a one-line workflow: give a passage to a model and ask it to “turn this into a comic.” The first image may look impressive. By the third, the character has a different face, the location has changed, a prop disappears between panels, or dialogue is baked into the image as uneditable gibberish.

For the _Tian Mo Shen Tan_ project, I used a different division of labor. Codex read and structured the novel, broke the story into beats, maintained the canon, prepared jobs, checked results, and organized the files. gpt-image-2 handled visual generation. A human remained responsible for taste, drama, continuity, and final approval.

The project turned a long novel containing three parts, 31 volumes, 281 numbered chapters, and three prologues into a traceable source library. EP000 through EP003 produced 72 approved panels and 16 platform-ready slices. More importantly, this was not a one-off image demo. It became a pipeline that can resume, revise, audit, and scale.

This case study explains the full method. The same structure can support wuxia, fantasy, mystery, historical, romance, or any long adaptation that needs stable characters and a coherent world.

One rights boundary matters from the outset: a notice included with source files does not prove permission for public adaptation or commercial distribution. This workflow assumes internal research and production testing. Before publishing, confirm the rights required for the novel text, characters, story, and derivative material.

## 1. The whole system: what Codex, image2, and people each do

![Novel-to-webtoon pipeline from rights confirmation and source ingestion to publishing slices](/assets/blog/codex-image2-webtoon/workflow.jpg)

The key is not asking one model to do everything. It is assigning clear responsibilities.

| Role | Best suited to | Should not decide alone |
| --- | --- | --- |
| Codex | Read the project, split the novel, build indexes, extract story beats, write storyboards, generate jobs, maintain state, run scripts, and validate structure | Final visual taste, copyright permission, or subjective approval of a character's presence |
| gpt-image-2 (image2 below) | Generate locations, characters, actions, creatures, and atmosphere from text and references; perform local image revisions | Episode structure, facts across shots, or final webtoon layout |
| Human | Choose the adaptation range, approve character designs and keyframes, judge expressions and dramatic force, and approve publication | Repetitive file transfer or manual upkeep of large amounts of shot state |

In short, Codex combines the producer, screenwriter, continuity editor, and automation engineer. image2 executes the visual brief. The person is the director and final reviewer.

## 2. Why you cannot drop a whole chapter into an image model

Novels and vertical comics use different narrative units. A novel can cross ten years in an internal monologue or summarize a war in one sentence. A webtoon must place information in visible shots, actions, expressions, and spatial relationships.

Sending a full chapter directly to an image prompt creates five common failures:

- **Uncontrolled density.** The model cannot distinguish essential plot facts from atmospheric prose.
- **Identity drift.** Faces, hair, age, body type, and clothing are redrawn from scratch in every panel.
- **Broken chronology.** Props appear too early and characters return after leaving.
- **Poor mobile composition.** Wide ensembles and poster-like collages do not read well on a phone.
- **Uneditable text.** Dialogue rendered into the image becomes misspelled or garbled and cannot be revised in layout.

The real design problem is the middle layer. Source text should pass through source mapping, story beats, storyboards, visual references, shot state, and layout data before becoming a published image.

## 3. Project structure: turn one creative experiment into a durable system

The project separates files by responsibility:

```text
source/raw/                 # Canonical source; never edited manually
source/normalized/          # Full text after encoding normalization
source/units/               # Text units split by part, volume, and chapter
source/index/               # Book structure index and quality reports
bible/                      # World, character, location, creature, and style bibles
production/episodes/EP001/  # Sources, script, storyboard, prompts, jobs, output, and QA
output/masters/             # 1080px-wide webtoon masters
output/slices/              # Platform publishing slices
scripts/                    # Ingest, validation, generation wrappers, and composition
```

This is more elaborate than a folder of prompts, but it solves three production problems: the source cannot be accidentally overwritten, every shot is traceable, and a failed batch can restart only the missing jobs.

## 4. Step 0: preserve the source before adapting it

The original novel uses GB18030 encoding. Strict GBK decoding fails, while GB18030 decodes it without replacement characters. Opening and resaving with the wrong encoding would corrupt the foundation for every later storyboard.

The ingest script performs four operations:

1. Compute the source SHA-256 and compare it with the configured expected value.
2. Decode strictly with the specified encoding and write a normalized UTF-8 text.
3. Scan structural markers for parts, volumes, chapters, and prologues.
4. Write chapter units, a full-book JSON index, and a source quality report.

```json
{
  "encoding": "gb18030",
  "expected_sha256": "9ff8f7ab...",
  "normalized_path": "source/normalized/book.txt",
  "index_path": "source/index/book.json",
  "units_dir": "source/units"
}
```

```powershell
& scripts\project.ps1 ingest
```

The engineering rule is simple: `source/raw/` is an immutable fact layer. Watermark cleanup, typo correction, and character normalization belong in a separate editorial layer with the original line, change, and reason recorded.

## 5. Step 1: use source maps to lock the adaptation boundary

A webtoon is not one illustration per sentence. Each episode needs a chosen scope, a beginning, a stopping point, and an explicit record of the facts that must survive adaptation.

EP001 uses all 58 lines of Part 1, Volume 1, Chapter 1. `source_map.json` records the source unit, selection, and purpose:

```json
{
  "episode_id": "EP001",
  "adaptation_policy": "story-beats",
  "sources": [{
    "unit_id": "P01-V01-C001",
    "role": "primary",
    "selection": {"mode": "complete-unit", "start_line": 1, "end_line": 58}
  }]
}
```

Reviewers no longer need to argue from memory about whether a moment came from the book. Every panel can return to a chapter and line range. The mapping also remains useful if one chapter later becomes three episodes or neighboring chapters are combined.

## 6. Step 2: find story beats before writing 14 shots

Codex first divided the 58 lines into six dramatic beats instead of immediately writing 14 image prompts.

| Beat | Content | Shots | Narrative function |
| --- | --- | --- | --- |
| B01 | Yuanshu City and Yunliu Academy | S001-S002 | Establish the world, school, and power order |
| B02 | History of spirit beasts | S003-S004 | Explain origins and growth stages |
| B03 | Ayen by the window | S005-S006 | Establish the hero's isolation |
| B04 | Naken's challenge | S007-S008 | Move from class into public conflict |
| B05 | Humiliation by the fire tiger | S009-S012 | Summon, attack, taunt, and exit |
| B06 | A mortal in a heroic family | S013-S014 | Contrast family glory with the hero's predicament |

Beats control reading rhythm. Worldbuilding cannot linger, conflict must escalate, and the ending must pull the reader forward. Only after that does `storyboard.json` record source lines, cast, place, framing, camera, action, dialogue, narration, and continuity state for each shot.

```json
{
  "shot_id": "EP001-S010",
  "source_line_range": [37, 39],
  "characters": ["Ayen", "Naken", "Tiger King"],
  "shot_size": "strong action wide shot",
  "camera": "a fireball crosses the diagonal into Ayen's chest",
  "continuity_state": {
    "props_required": ["single compact fireball"],
    "props_forbidden": ["blood", "multiple fireballs"],
    "preserve": ["character identities", "lake layout"]
  }
}
```

`props_forbidden` and `preserve` matter as much as what the model should draw. Structured negative state is more reliable than appending “do not make mistakes” to a long prompt.

## 7. Step 3: build a visual bible before sequential shots

![EP001 character reference for Ayen, Naken, Lanny, Yilian, and Teacher Gais](/assets/blog/codex-image2-webtoon/cast-reference.jpg)

Character consistency comes from identity invariants, approved references, and an explicit mapping for every shot, not from repeating “the same person” in prose.

The visual bible fixes the cel-shaded anime medium, clean linework, two or three value levels, mobile-first readability, turnaround and expression references, identity traits, scene layout, prop timing, and a strict ban on generated dialogue or watermarks.

EP001 first created references for five people and the fire tiger. Character shots then used image-to-image so the references controlled identity. Establishing shots without characters could use text generation.

![Two consecutive academy environment shots with inherited architecture and palette](/assets/blog/codex-image2-webtoon/environment-continuity.jpg)

References can stabilize places as well as people. S001 establishes blue glazed roofs, white walls, pale cyan, and restrained gold at Yunliu Academy. S002 receives S001 as an input and continues the architectural language and palette.

## 8. Step 4: split prompts into a series prefix and a shot task

The project keeps global rules in `series-prefix.txt`: premium Chinese vertical webtoon panels, cel-shaded anime rendering, a 2:3 frame, one focal point, downward reading flow, safe space for later typography, the coexistence of ancient fantasy and lost technology, and no readable text or watermark.

Each shot task then describes only the immediate visual job:

```text
Input images:
Image 1 controls Ayen Stark and Naken Silva.
Image 2 controls the cat-sized fire tiger Tiger King.

Primary request:
Tiger King fires one compact orange fireball diagonally into Ayen's chest.
The impact knocks Ayen backward and down onto one knee.

Constraints:
Preserve all three identities and scale; show exactly one fireball.

Avoid:
No gore, no multiple fireballs, no giant tiger, no text, no watermark.
```

![EP001-S010 uses references for identity and a shot task for action, scale, and injury](/assets/blog/codex-image2-webtoon/shot-s010.jpg)

A practical prompt states what each input controls, then gives the primary request, subject and action, composition, lighting and mood, constraints, and exclusions. Attaching an image is not enough; Image 1 and Image 2 need named control scopes so their identities do not blend.

## 9. Step 5: make every shot a resumable JSONL job

Final jobs live in `jobs/final.jsonl`, one JSON object per line:

```json
{
  "scene_id": "EP001-S010",
  "operation": "img2img",
  "images": ["cast-reference.png", "fire-tiger-reference.png"],
  "input_fidelity": "high",
  "prompt": "...",
  "out": "EP001-S010.png",
  "size": "1024x1536",
  "scene_state": {
    "characters_present": ["Ayen", "Naken", "Tiger King"],
    "props_required": ["single compact fireball"],
    "props_forbidden": ["blood", "multiple fireballs"],
    "preserve": ["identities", "lake layout"]
  }
}
```

The operation must reflect reality. A reference-image job uses `img2img`, calls the image editing endpoint, and includes the input files. A preflight confirms the request will reach `/v1/images/edits` with Image 1 attached.

```powershell
& scripts\project.ps1 doctor
& scripts\project.ps1 reference-dry-run
& scripts\project.ps1 dry-run
& scripts\run_agk2img.ps1 final EP001
```

The wrapper uses controlled concurrency, `--skip-existing`, and a manifest containing results, durations, and status. A disconnected batch can resume without regenerating completed shots.

## 10. Step 6: approve two keyframes before scaling the batch

Start with two high-risk images: a close character shot that tests face, age, clothing, and expression; and a group or complex environment that tests identity separation, spatial continuity, and whether references actually work.

Only expand to the episode batch after those two pass. EP002 created five new references, two key drafts, and one draft revision before generating 26 final shots. The extra gate exposed expensive mistakes while they were still cheap.

## 11. Step 7: human QA is a checklist, not “looks fine”

Every image is checked for identity, chronology, space, action and anatomy, accidental text, and mobile readability. The project also records completeness, dimensions, required and forbidden props, source coverage, layout, and slice boundaries.

### A real revision: why did the teacher join the students?

![Before and after: Teacher Gais was inherited into a student conflict and replaced locally](/assets/blog/codex-image2-webtoon/revision-before-after.jpg)

The EP001 cast sheet contained Ayen, Naken, Lanny, Yilian, and Teacher Gais. S007 needed Naken and four companions surrounding Ayen, but the model reused the teacher as one of the companions. Scene continuity then carried the mistake to the lakeside.

Instead of regenerating the whole batch, five local edit jobs replaced the incorrect figure with an ordinary teenage student while preserving every other face, the composition, lighting, and location. Each revision records the parent image, reason, output, status, and API time.

The lesson is twofold: broad reference sheets provide more information but increase the chance of reusing irrelevant identities; and revision prompts must say exactly what changes and what remains fixed.

## 12. Step 8: keep text out of images and add it in layout

Generated text is not maintainable. Dialogue, narration, sound effects, titles, and watermarks are prohibited during image generation. Chinese text is stored in `layout/layout.json` and rendered later by the composition script.

```json
{
  "panel_id": "EP001-S007",
  "image": "EP001-S007-r1.png",
  "label": "07 | Surrounded",
  "caption": "Naken: Young Master Ayen, did you bring your spirit beast?\nAyen: Spirit beast? What spirit beast?"
}
```

The composer normalizes panels by width, renders labels and dialogue with an appropriate CJK font, writes 1080px-wide sRGB PNG masters, slices only at approved panel boundaries, and checks that no slice exceeds 12000px.

![The completed 1080px EP001 master divided into three publishing slices](/assets/blog/codex-image2-webtoon/episode-slices.jpg)

EP001 measures 1080 × 27227px and becomes three slices: 1080 × 9984, 1080 × 9321, and 1080 × 7922px. Cuts after panels 5 and 10 preserve every image and caption.

## 13. Failure recovery must support “continue from image 9”

Network, process, and file state matter as much as prompts in batch production. EP003 encountered a TLS EOF after S009. The project verified that the original process had exited, recovered S009 alone, reduced concurrency to one, continued from S010 through S024, skipped S001-S008, and wrote the recovery to a separate manifest.

Image APIs also return slightly different dimensions: 1366 × 2048, 1024 × 1536, 1023 × 1537, and 1024 × 1535 all appeared. The correct response is to validate that the image is complete and visually acceptable, then normalize by width during offline composition, not regenerate for a one-pixel discrepancy.

## 14. What the production data shows

![Approved panels and revision counts for EP000 through EP003](/assets/blog/codex-image2-webtoon/production-metrics.jpg)

| Episode | Source | Approved panels | Revision outputs | Master height | Slices |
| --- | --- | ---: | ---: | ---: | ---: |
| EP000 Prologue | P01-V01-PR | 8 | 1 | 15765px | 2 |
| EP001 No Promise | P01-V01-C001 | 14 | 5 | 27227px | 3 |
| EP002 Strange Spirit Beast | P01-V01-C002 | 26 | 3 | 50326px | 6 |
| EP003 Family Crisis | P01-V01-C003 | 24 | 8 | 46529px | 5 |

Across four episodes, the system produced 72 approved panels, 17 revision outputs, and 16 publishing slices. The point is not raw speed. Even as episode size grew from 8 to 26 shots, the project could still answer where every image came from, which references it used, why it changed, which version was approved, and where it shipped.

## 15. Reusable prompt and state templates

```text
Use case: identity-preserve illustration-story
Asset type: full-bleed vertical panel for a premium color webtoon
Style/medium: [series visual style]

Input images:
Image 1 controls [Character A identity and clothing].
Image 2 controls [Character B / creature / place / prop].

Primary request:
[One sentence describing what happens]

Subject and action:
[Positions, action, direction, emotion, relationships]

Composition:
[Shot size, camera, focus, vertical reading flow, text-safe area]

Lighting and mood:
[Time, palette, light source, emotion]

Constraints:
[Identity, scale, injury, and scene state to preserve]

Avoid:
[People, objects, text, actions, and styles that must not appear]
```

```json
{
  "characters_present": [],
  "props_required": [],
  "props_forbidden": [],
  "props_introduced": [],
  "environment_changes": [],
  "preserve": []
}
```

Keep these fields in JSON instead of prompt prose alone so Codex can reuse them during later shots, QA, and revision.

## 16. Complete execution checklist

### Source and rights

- [ ] Confirm source, adaptation, copying, and distribution rights.
- [ ] Preserve a read-only source and record encoding plus SHA-256.
- [ ] Produce normalized text, chapter units, indexes, and quality reports.

### Adaptation and storyboard

- [ ] Register the episode's source range in `source_map.json`.
- [ ] Write story beats, emotional progression, and the ending hook first.
- [ ] Record source, cast, location, framing, action, dialogue, narration, and state per panel.
- [ ] Do not assume one chapter must equal one episode.

### Visual production

- [ ] Build the series bible and references for characters, locations, and creatures.
- [ ] State what each input image controls.
- [ ] Prohibit generated text.
- [ ] Dry-run, then approve one close-up and one group keyframe.
- [ ] Use manifests, `--skip-existing`, and controlled concurrency for final batches.

### QA, revision, and delivery

- [ ] Check identity, chronology, space, action, text, and mobile readability per panel.
- [ ] Limit revisions to the problem area and declare what must be preserved.
- [ ] Make layout point to the approved version explicitly.
- [ ] Produce 1080px-wide sRGB PNG masters.
- [ ] Keep every slice within platform limits without cutting text or panels.
- [ ] Save QA checklists, revision logs, and production reports.

## 17. Five principles worth keeping

1. **Source, adaptation, visual design, generation, and layout are separate data layers.** One giant prompt should not carry every responsibility.
2. **Every reference needs a control scope.** Uploading an image does not tell the model whose traits to inherit.
3. **Continuity needs state, not memory alone.** Cast, props, injuries, and environmental changes belong in structured records.
4. **Add text later.** Separating art and typography keeps dialogue, narration, and platform variants editable.
5. **Failure belongs in the design.** Manifests, locks, `--skip-existing`, local revision, and recovery jobs turn a sample into a series.

## Try this today

1. Pick one short story or chapter and create a read-only source, normalized text, and source index before generating an image.
2. Divide the chapter into four to six story beats, then assign shots to beats instead of splitting paragraphs evenly.
3. Generate one close character keyframe and one group keyframe to test identity and reference mapping.
4. Put `characters_present`, `props_required`, `props_forbidden`, and `preserve` in JSON before starting a batch.

## Conclusion

The hard part of making a novel webtoon with Codex and image2 is not whether one attractive picture can be generated. It is whether hundreds of thousands of words can become a production system that preserves facts, characters, and visual continuity over time.

When the source is immutable, the adaptation is mapped, characters have approved references, shots carry state, generation jobs can resume, revisions are logged, and typography lives in its own layer, AI becomes more than an inspiration tool. It becomes a production capability that people can direct, audit, and deliver.

The 72 approved panels completed so far are only the first four runs. The most valuable assets are the growing character and location bibles, shot state, revision knowledge, and reusable scripts. Those assets make each new episode more stable than the last.

*Data note: figures in this case study come from the project `README.md`, `config/project.json`, EP000-EP003 `source_map.json`, `storyboard.json`, `jobs/*.jsonl`, `layout/layout.json`, `qa/revision-log.json`, and `qa/production-report.json`, current through July 19, 2026.*
