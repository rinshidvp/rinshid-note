---
title: How to Think Like an Engineer in the AI Era
slug: how-to-think-like-an-engineer-in-the-ai-era
summary: AI can help you build faster. Learn how to choose the right problem, ask better questions, and check your work—with examples from college life.
type: article
language: en
tags: [AI, Engineering, Learning]
draft: false
featured: false
published: 2026-10-14
---

Imagine your college asks you to build an attendance app.

You open an AI tool, describe a few screens, and get some code. Soon, you have a login page, a student list, and a button to mark attendance.

It looks like progress. But then a teacher asks: “Will this stop students from marking attendance for their friends?”

Your app does not answer that question.

You built what was requested before understanding why it was needed.

This is where engineering thinking matters. AI can help you make a solution quickly. You still need to decide what problem to solve, what matters, and whether the solution actually works.

You do not need years of experience to start thinking this way. You can practise it on small, everyday problems.

## Understand the problem before choosing a tool

Suppose students keep missing important college announcements. Your first idea might be: “Let's build an app.”

But why are they missing announcements?

Maybe updates are spread across five groups. Maybe important messages get buried under casual conversations. Maybe the notice arrives too late.

These are different problems. Another app could become just another place students forget to check.

Before building, ask:

- Who has this problem?
- What happens now, and where does it go wrong?
- What would a better result look like?

For this example, a useful goal is: “Students can find the latest deadline in one place.” That is clearer than “We need an app.”

You might start with one shared notice page and one person responsible for updating it. Try it with a class before building anything bigger.

**The lesson:** describe the result you want before deciding what to build.

## Break a big problem into small steps

“Build a canteen ordering system” sounds like one task. It is really several tasks:

1. Show what food is available.
2. Let a student place an order.
3. Tell the canteen about it.
4. Handle payment.
5. Tell the student when and where to collect the food.

Each step has its own questions. Who updates the menu? What happens when an item sells out? How does the canteen know which student placed an order?

Start with the smallest useful version. Perhaps students order from a short menu and pay at pickup. Online payment can wait until you know the ordering process works.

This gives you a smaller task to discuss with AI and a smaller result to check. If something fails, you have a better idea of where to look.

**The lesson:** build one complete, useful path before adding every feature.

## Give AI context, not just commands

Compare these two requests:

> Build a canteen ordering app.

> Help me plan a lunch-ordering tool for a college canteen. Students use phones, and the internet can be unreliable. One staff member handles orders. For the first version, students pay at pickup. Ask me about missing details before suggesting a solution.

The second request explains the situation, the limits, and what can wait.

Those limits are often called **constraints**. A small budget, a slow connection, and a busy staff member are all constraints. They help you rule out ideas that look good on a screen but do not fit real life.

You can also ask AI: “What assumptions are you making?” or “What could go wrong with this approach?” Treat its suggestions as things to investigate, not final decisions.

Do not paste real student records, passwords, or private payment details into a prompt. Use made-up examples when discussing the design.

**The lesson:** a useful AI request explains the people, the goal, and the limits—not just the feature.

## Check the answer instead of trusting its confidence

A payment screen may work perfectly when someone taps the button once. What happens if they tap it twice because the internet is slow?

Could two orders appear? Could they be charged twice? If payment succeeds but the confirmation page fails, how would they find out what happened?

These questions are not unnecessary worry. They describe ordinary behaviour.

For any feature, check three kinds of situations:

- **Normal:** everything goes as expected.
- **Unusual but possible:** someone submits twice or enters an empty value.
- **Failure:** the connection drops or a service is unavailable.

Ask AI to suggest checks, then try them yourself. A claim that “the code handles errors” is not the same as seeing what a student sees when an order fails.

And not every check needs code. Show a rough screen to the canteen staff. If they cannot tell which orders are ready, you have found a problem before spending time building it.

**The lesson:** judge a solution by what happens when you use it, not by how convincing its explanation sounds.

## Choose what is enough, not what looks impressive

Imagine you are organising a one-day college workshop with 40 seats.

You could build an account system, a dashboard, automated certificates, and a mobile app. Or you could start with a form and a spreadsheet.

The simpler option may be enough if someone can manage registrations and confirm seats. But if places fill quickly, check how you will prevent extra registrations. Simpler does not mean careless.

Ask: “What do we gain from this extra feature, and who will maintain it?”

Every feature creates work after launch. Someone must fix it, update it, and answer questions about it. AI making the first version faster does not remove those responsibilities.

**The lesson:** choose the least complicated solution that meets the real needs.

## Keep learning the basics

If AI can write code, why learn programming?

For the same reason you learn arithmetic even when you have a calculator: you need to notice when an answer does not make sense.

Suppose AI writes a page where students can view their marks. If changing a number in the address lets one student see another student's marks, the page is not safe—even if it looks polished.

Understanding the basics helps you ask the right question: “Does the server check that this student is allowed to see this record?”

You do not need to know everything. Learn the parts your project depends on. Read the code AI gives you. Ask it to explain a small section. Change something, predict what will happen, and check your prediction.

If you cannot explain an important part yet, slow down before relying on it—especially when money or private information is involved.

**The lesson:** use AI to support your learning, not to hide gaps in your understanding.

## A checklist you can use today

Before your next project, write five short answers:

1. **Understand:** Who needs help, and what is going wrong?
2. **Break down:** What is the smallest useful version?
3. **Ask AI:** What context and limits does it need?
4. **Check:** How will I know it works? What could fail?
5. **Improve:** What did real use teach me to change?

Try this with one problem around you: a confusing timetable, lost library books, or a long canteen queue.

Write down the people involved, two limits, one simple solution, and three things that could go wrong. If possible, talk to one person who faces the problem before opening an AI tool.

You may discover that you need less code than you thought. Or that the difficult part is not the code at all.

That discovery is useful work, too.

In the AI era, thinking like an engineer means taking responsibility for the result—not just producing an answer.
