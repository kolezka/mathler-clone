export const infoDialogTemplate = document.createElement(`template`);

infoDialogTemplate.innerHTML = `
<style>
  p {
    font-size: .875rem;
    margin: 0 0 8px;
  }
  ul {
    margin: 0 0 8px;
    padding-left: 16px;
  }
  ul li {
    margin: 0 0 4px;
    font-size: .875rem;
  }
  h3 {
    font-size: 1rem;
    margin: 16px 0 8px;
  }
</style>
<p>
  Try to find the hidden calculation in 6 guesses!
</p>
<p>
  After each guess, the color of the tiles will change to show how close you are to the solution.
</p>
<ul>
  <li>Green are in the correct place.</li>
  <li>Orange are in the solution, but in a different place.</li>
  <li>Gray are not in the solution.</li> 
</ul>

<h3>Additional rules</h3>

<ul>
  <li>Numbers and operators can appear multiple times.</li>
  <li>Calculate / or * before - or + (order of operations).</li>
  <li>Commutative solutions are accepted, for example 20+7+3 and 3+7+20.</li>
  <li>Commutative solutions will be automatically rearranged to the exact solution.</li>
</ul>

`;
