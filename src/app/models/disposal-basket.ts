export class DisposalBasket {
  public education: number[] = []
  public links: number[] = []
  public jobs: number[] = []

  public clear(): void {
    this.education.slice(0, this.education.length);
    this.links.slice(0, this.links.length);
    this.jobs = this.jobs.slice(0, this.jobs.length);
    console.log(this.jobs)
  }

  public addTOBasket_education(id: number): void {
    this.education.push(id);
  }

  public addTOBasket_links(id: number): void {
    this.links.push(id);
  }

  public addTOBasket_jobs(id: number): void {
    this.jobs.push(id);
  }

  public getDisposalBasket(): Object {
    return { "education": this.education, "links": this.links, "jobs": this.jobs }
  }
}
